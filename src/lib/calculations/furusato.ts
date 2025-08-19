import {
  FurusatoCalculationInput,
  FurusatoCalculationResult,
  FamilyType,
  IncomeType,
  DeductionBreakdown,
  HousingLoanCombinationResult,
  FurusatoCalculationConfig,
} from '@/types/furusato';
import {
  validateNumericInput,
  safeCalculate,
  CalculationError,
} from '@/lib/utils/error-utils';

// 計算設定・定数
const CONFIG: FurusatoCalculationConfig = {
  basicDeductionAmount: 480000, // 基礎控除額（48万円）
  lifeInsuranceDeductionMax: 120000, // 生命保険料控除の上限
  earthquakeInsuranceDeductionMax: 50000, // 地震保険料控除の上限
  residentTaxRate: 0.10, // 住民税率 10%
  selfBurdenAmount: 2000, // ふるさと納税の自己負担額
  safetyFactor: 0.9, // 安全係数（90%）
};

// 所得税率表（2024年分）
const INCOME_TAX_RATES = [
  { min: 0, max: 1950000, rate: 0.05, deduction: 0 },
  { min: 1950000, max: 3300000, rate: 0.10, deduction: 97500 },
  { min: 3300000, max: 6950000, rate: 0.20, deduction: 427500 },
  { min: 6950000, max: 9000000, rate: 0.23, deduction: 636000 },
  { min: 9000000, max: 18000000, rate: 0.33, deduction: 1536000 },
  { min: 18000000, max: 40000000, rate: 0.40, deduction: 2796000 },
  { min: 40000000, max: Infinity, rate: 0.45, deduction: 4796000 },
];

/**
 * 給与所得控除額を計算
 */
function calculateSalaryDeduction(annualIncome: number): number {
  if (annualIncome <= 1625000) {
    return 550000;
  } else if (annualIncome <= 1800000) {
    return annualIncome * 0.4 - 100000;
  } else if (annualIncome <= 3600000) {
    return annualIncome * 0.3 + 80000;
  } else if (annualIncome <= 6600000) {
    return annualIncome * 0.2 + 440000;
  } else if (annualIncome <= 8500000) {
    return annualIncome * 0.1 + 1100000;
  } else {
    return 1950000; // 上限
  }
}

/**
 * 配偶者控除・配偶者特別控除を計算
 */
function calculateSpouseDeduction(
  familyType: FamilyType,
  taxableIncome: number
): number {
  if (familyType === 'single' || familyType === 'married_high_income') {
    return 0;
  }

  // 本人の所得金額による控除額の調整
  if (taxableIncome > 10000000) return 0;
  if (taxableIncome > 9500000) return 130000;
  if (taxableIncome > 9000000) return 260000;

  if (familyType === 'married_no_income') {
    return 380000; // 配偶者控除
  } else if (familyType === 'married_with_income') {
    return 360000; // 配偶者特別控除（簡易計算）
  }

  return 0;
}

/**
 * 扶養控除を計算
 */
function calculateDependentDeduction(dependents: number): number {
  return dependents * 380000; // 一般扶養親族として計算
}

/**
 * 生命保険料控除を計算
 */
function calculateLifeInsuranceDeduction(premium: number): number {
  if (premium <= 0) return 0;
  if (premium <= 20000) return premium;
  if (premium <= 40000) return premium * 0.5 + 10000;
  if (premium <= 80000) return premium * 0.25 + 20000;
  return Math.min(premium * 0.125 + 30000, CONFIG.lifeInsuranceDeductionMax);
}

/**
 * 地震保険料控除を計算
 */
function calculateEarthquakeInsuranceDeduction(premium: number): number {
  return Math.min(premium, CONFIG.earthquakeInsuranceDeductionMax);
}

/**
 * 所得税率を取得
 */
function getIncomeTaxRate(taxableIncome: number): { rate: number; deduction: number } {
  const bracket = INCOME_TAX_RATES.find(
    (rate) => taxableIncome > rate.min && taxableIncome <= rate.max
  );
  return bracket || INCOME_TAX_RATES[INCOME_TAX_RATES.length - 1];
}

/**
 * 課税所得を計算
 */
function calculateTaxableIncome(
  input: FurusatoCalculationInput
): { taxableIncome: number; breakdown: DeductionBreakdown } {
  const {
    annualIncome,
    incomeType,
    familyType,
    dependents,
    socialInsurancePremium,
    lifeInsurancePremium = 0,
    earthquakeInsurancePremium = 0,
    medicalExpenseDeduction = 0,
    smallBusinessMutualAidPremium = 0,
  } = input;

  // 給与所得または事業所得を計算
  const salaryDeduction = incomeType === 'salary' ? calculateSalaryDeduction(annualIncome) : 0;
  const income = incomeType === 'salary' ? annualIncome - salaryDeduction : annualIncome;

  // 各種所得控除を計算
  const basicDeduction = CONFIG.basicDeductionAmount;
  const socialInsuranceDeduction = socialInsurancePremium;
  const lifeInsuranceDeduction = calculateLifeInsuranceDeduction(lifeInsurancePremium);
  const earthquakeInsuranceDeduction = calculateEarthquakeInsuranceDeduction(earthquakeInsurancePremium);
  const medicalExpenseDeductionAmount = medicalExpenseDeduction;
  const smallBusinessMutualAidDeduction = smallBusinessMutualAidPremium;

  // 仮の課税所得を計算（配偶者控除計算のため）
  const tempTaxableIncome = Math.max(0, income - (
    basicDeduction +
    socialInsuranceDeduction +
    lifeInsuranceDeduction +
    earthquakeInsuranceDeduction +
    medicalExpenseDeductionAmount +
    smallBusinessMutualAidDeduction
  ));

  const spouseDeduction = calculateSpouseDeduction(familyType, tempTaxableIncome);
  const dependentDeduction = calculateDependentDeduction(dependents);

  // 最終的な課税所得を計算
  const totalDeductions = 
    basicDeduction +
    socialInsuranceDeduction +
    spouseDeduction +
    dependentDeduction +
    lifeInsuranceDeduction +
    earthquakeInsuranceDeduction +
    medicalExpenseDeductionAmount +
    smallBusinessMutualAidDeduction;

  const taxableIncome = Math.max(0, income - totalDeductions);

  const breakdown: DeductionBreakdown = {
    basicDeduction,
    socialInsuranceDeduction,
    spouseDeduction,
    dependentDeduction,
    lifeInsuranceDeduction: lifeInsuranceDeduction,
    earthquakeInsuranceDeduction: earthquakeInsuranceDeduction,
    medicalExpenseDeduction: medicalExpenseDeductionAmount,
    smallBusinessMutualAidDeduction: smallBusinessMutualAidDeduction,
    housingLoanDeduction: 0, // 税額控除なので後で計算
    furusatoDeduction: 0, // 計算対象なので0
  };

  return { taxableIncome, breakdown };
}

/**
 * ふるさと納税控除上限額を計算
 */
function calculateFurusatoLimit(
  taxableIncome: number,
  housingLoanDeduction: number = 0
): number {
  if (taxableIncome <= 0) return 0;

  const { rate: incomeTaxRate } = getIncomeTaxRate(taxableIncome);
  const residentTaxRate = CONFIG.residentTaxRate;

  // 所得税の算出税額
  const incomeTax = Math.max(0, taxableIncome * incomeTaxRate - housingLoanDeduction);
  
  // 住民税所得割額（簡易計算）
  const residentTaxIncome = taxableIncome * residentTaxRate;
  
  // 住民税からの住宅ローン控除適用
  const remainingHousingLoan = Math.max(0, housingLoanDeduction - incomeTax);
  const residentTax = Math.max(0, residentTaxIncome - remainingHousingLoan);

  // ふるさと納税控除上限額の計算
  // (住民税所得割額 × 20% + 所得税率 × 復興特別所得税率) ÷ (90% - 所得税率 × 復興特別所得税率) + 2,000円
  const recoveryTaxRate = 1.021; // 復興特別所得税を考慮
  const effectiveIncomeTaxRate = incomeTaxRate * recoveryTaxRate;
  
  const numerator = residentTax * 0.20 + effectiveIncomeTaxRate;
  const denominator = 0.90 - effectiveIncomeTaxRate;
  
  if (denominator <= 0) {
    throw new CalculationError('所得税率が高すぎるため、ふるさと納税の控除上限額を計算できません');
  }
  
  const limit = (numerator / denominator) + CONFIG.selfBurdenAmount;
  
  return Math.max(CONFIG.selfBurdenAmount, Math.floor(limit));
}

/**
 * 住宅ローン控除併用時の詳細計算
 */
function calculateHousingLoanCombination(
  input: FurusatoCalculationInput
): HousingLoanCombinationResult {
  const { housingLoanDeduction = 0 } = input;
  
  if (housingLoanDeduction === 0) {
    const normalLimit = calculateFurusatoLimit(
      calculateTaxableIncome(input).taxableIncome,
      0
    );
    
    return {
      normalDeductionLimit: normalLimit,
      adjustedDeductionLimit: normalLimit,
      reductionAmount: 0,
      conflictWarning: '',
    };
  }

  const { taxableIncome } = calculateTaxableIncome(input);
  const normalLimit = calculateFurusatoLimit(taxableIncome, 0);
  const adjustedLimit = calculateFurusatoLimit(taxableIncome, housingLoanDeduction);
  const reductionAmount = normalLimit - adjustedLimit;

  let conflictWarning = '';
  if (reductionAmount > 0) {
    conflictWarning = `住宅ローン控除の影響により、ふるさと納税の控除上限額が${reductionAmount.toLocaleString()}円減額されています。`;
  }

  return {
    normalDeductionLimit: normalLimit,
    adjustedDeductionLimit: adjustedLimit,
    reductionAmount,
    conflictWarning,
  };
}

/**
 * メインの計算関数
 */
export function calculateFurusato(input: FurusatoCalculationInput): FurusatoCalculationResult {
  // 入力値のバリデーション
  validateNumericInput(input.annualIncome, '年収', 0, 100000000);
  validateNumericInput(input.socialInsurancePremium, '社会保険料控除額', 0, 10000000);
  validateNumericInput(input.dependents, '扶養親族数', 0, 20);
  
  if (input.lifeInsurancePremium !== undefined) {
    validateNumericInput(input.lifeInsurancePremium, '生命保険料控除', 0, 1000000);
  }
  
  if (input.housingLoanDeduction !== undefined) {
    validateNumericInput(input.housingLoanDeduction, '住宅ローン控除', 0, 5000000);
  }

  return safeCalculate(() => {
    const { taxableIncome, breakdown } = calculateTaxableIncome(input);
    const { rate: incomeTaxRate } = getIncomeTaxRate(taxableIncome);
    
    // 住宅ローン控除併用の計算
    const housingLoanResult = calculateHousingLoanCombination(input);
    const deductionLimit = housingLoanResult.adjustedDeductionLimit;
    
    // おすすめ寄附金額（上限の90%）
    const recommendedDonation = Math.floor(deductionLimit * CONFIG.safetyFactor);
    
    // 節税効果の計算（控除上限額で寄附した場合の節税効果）
    const donationAmount = deductionLimit;
    const incomeTaxReduction = Math.min(
      (donationAmount - CONFIG.selfBurdenAmount) * incomeTaxRate * 1.021,
      donationAmount * 0.4
    );
    const residentTaxReduction = donationAmount - CONFIG.selfBurdenAmount - incomeTaxReduction;
    const totalTaxReduction = incomeTaxReduction + residentTaxReduction;

    // 警告メッセージの生成
    const warnings: string[] = [];
    if (housingLoanResult.conflictWarning) {
      warnings.push(housingLoanResult.conflictWarning);
    }
    
    if (taxableIncome === 0) {
      warnings.push('課税所得が0円のため、ふるさと納税の控除効果はありません。');
    }
    
    if (deductionLimit <= CONFIG.selfBurdenAmount) {
      warnings.push('所得が低いため、ふるさと納税の控除効果が限定的です。');
    }

    return {
      deductionLimit,
      recommendedDonation,
      selfBurden: CONFIG.selfBurdenAmount,
      incomeTaxReduction,
      residentTaxReduction,
      totalTaxReduction,
      taxableIncome,
      incomeTaxRate,
      residentTaxRate: CONFIG.residentTaxRate,
      warnings: warnings.length > 0 ? warnings : undefined,
      hasHousingLoanConflict: housingLoanResult.reductionAmount > 0,
    };
  }, 'ふるさと納税控除上限額の計算中にエラーが発生しました');
}

/**
 * 年収別シミュレーション
 */
export function simulateByIncome(
  baseInput: Omit<FurusatoCalculationInput, 'annualIncome'>,
  incomeRange: { min: number; max: number; step: number }
) {
  const results = [];
  
  for (let income = incomeRange.min; income <= incomeRange.max; income += incomeRange.step) {
    try {
      const input = { ...baseInput, annualIncome: income };
      const result = calculateFurusato(input);
      
      results.push({
        income,
        deductionLimit: result.deductionLimit,
        effectiveRate: result.deductionLimit / income,
      });
    } catch (error) {
      // エラーの場合はスキップ
      continue;
    }
  }
  
  return results;
}

/**
 * 通貨フォーマット
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * パーセンテージフォーマット
 */
export function formatPercentage(rate: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(rate);
}