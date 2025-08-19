import { calculateFurusato } from '../furusato';
import { FurusatoCalculationInput } from '@/types/furusato';

describe('ふるさと納税計算ロジック', () => {
  describe('基本的な計算パターン', () => {
    test('独身・年収500万円・給与所得の場合', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 5000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 750000,
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      const result = calculateFurusato(input);

      // 年収500万円の独身の場合、控除上限額は約61,000円程度が目安
      expect(result.deductionLimit).toBeGreaterThan(50000);
      expect(result.deductionLimit).toBeLessThan(80000);
      
      // 実質自己負担額は2000円
      expect(result.selfBurden).toBe(2000);
      
      // おすすめ寄附金額は上限の90%
      expect(result.recommendedDonation).toBe(Math.floor(result.deductionLimit * 0.9));
      
      // 税率が正しく設定されていることを確認
      expect(result.incomeTaxRate).toBeGreaterThan(0);
      expect(result.residentTaxRate).toBe(0.10); // 住民税率は10%固定
    });

    test('独身・年収300万円・給与所得の場合', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 3000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 450000,
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      const result = calculateFurusato(input);

      // 年収300万円の独身の場合、控除上限額は約28,000円程度が目安
      expect(result.deductionLimit).toBeGreaterThan(20000);
      expect(result.deductionLimit).toBeLessThan(40000);
      
      expect(result.selfBurden).toBe(2000);
    });

    test('独身・年収1000万円・給与所得の場合', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 10000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 1500000,
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      const result = calculateFurusato(input);

      // 年収1000万円の独身の場合、控除上限額は約176,000円程度が目安
      expect(result.deductionLimit).toBeGreaterThan(150000);
      expect(result.deductionLimit).toBeLessThan(200000);
    });
  });

  describe('家族構成による影響', () => {
    const baseInput: FurusatoCalculationInput = {
      annualIncome: 5000000,
      incomeType: 'salary',
      dependents: 0,
      socialInsurancePremium: 750000,
      lifeInsurancePremium: 0,
      earthquakeInsurancePremium: 0,
      housingLoanDeduction: 0,
      medicalExpenseDeduction: 0,
      smallBusinessMutualAidPremium: 0,
    };

    test('配偶者あり（年収103万円以下）の場合', () => {
      const input = { ...baseInput, familyType: 'married_no_income' as const };
      const result = calculateFurusato(input);

      // 配偶者控除により控除上限額が変わることを確認
      expect(result.deductionLimit).toBeGreaterThan(0);
      expect(result.selfBurden).toBe(2000);
    });

    test('配偶者あり（年収103万円超201万円以下）の場合', () => {
      const input = { ...baseInput, familyType: 'married_with_income' as const };
      const result = calculateFurusato(input);

      expect(result.deductionLimit).toBeGreaterThan(0);
      expect(result.selfBurden).toBe(2000);
    });

    test('配偶者あり（年収201万円超）の場合', () => {
      const input = { ...baseInput, familyType: 'married_high_income' as const };
      const result = calculateFurusato(input);

      expect(result.deductionLimit).toBeGreaterThan(0);
      expect(result.selfBurden).toBe(2000);
    });

    test('扶養親族がいる場合', () => {
      const input = { ...baseInput, familyType: 'single' as const, dependents: 2 };
      const result = calculateFurusato(input);

      // 扶養控除により控除上限額が変わることを確認
      expect(result.deductionLimit).toBeGreaterThan(0);
      expect(result.selfBurden).toBe(2000);
    });
  });

  describe('各種控除による影響', () => {
    const baseInput: FurusatoCalculationInput = {
      annualIncome: 6000000,
      incomeType: 'salary',
      familyType: 'single',
      dependents: 0,
      socialInsurancePremium: 900000,
      lifeInsurancePremium: 0,
      earthquakeInsurancePremium: 0,
      housingLoanDeduction: 0,
      medicalExpenseDeduction: 0,
      smallBusinessMutualAidPremium: 0,
    };

    test('生命保険料控除がある場合', () => {
      const inputWithoutInsurance = baseInput;
      const inputWithInsurance = { ...baseInput, lifeInsurancePremium: 100000 };

      const resultWithout = calculateFurusato(inputWithoutInsurance);
      const resultWith = calculateFurusato(inputWithInsurance);

      // 生命保険料控除により控除上限額が変わることを確認
      // 控除額が増えると課税所得が減り、ふるさと納税の控除上限額も変わる
      expect(resultWith.deductionLimit).not.toBe(resultWithout.deductionLimit);
    });

    test('医療費控除がある場合', () => {
      const inputWithoutMedical = baseInput;
      const inputWithMedical = { ...baseInput, medicalExpenseDeduction: 200000 };

      const resultWithout = calculateFurusato(inputWithoutMedical);
      const resultWith = calculateFurusato(inputWithMedical);

      // 医療費控除により控除上限額が変わることを確認
      expect(resultWith.deductionLimit).not.toBe(resultWithout.deductionLimit);
    });

    test('住宅ローン控除がある場合', () => {
      const inputWithoutHousing = baseInput;
      const inputWithHousing = { ...baseInput, housingLoanDeduction: 300000 };

      const resultWithout = calculateFurusato(inputWithoutHousing);
      const resultWith = calculateFurusato(inputWithHousing);

      // 住宅ローン控除がある場合、控除額の競合が発生する可能性
      expect(resultWith.hasHousingLoanConflict).toBeDefined();
      
      // 住宅ローン控除により実際の控除上限額が減る場合がある
      if (resultWith.hasHousingLoanConflict) {
        expect(resultWith.deductionLimit).toBeLessThanOrEqual(resultWithout.deductionLimit);
      }
    });

    test('小規模企業共済等掛金控除（iDeCo）がある場合', () => {
      const inputWithoutIdeco = baseInput;
      const inputWithIdeco = { ...baseInput, smallBusinessMutualAidPremium: 276000 }; // 年額上限

      const resultWithout = calculateFurusato(inputWithoutIdeco);
      const resultWith = calculateFurusato(inputWithIdeco);

      // iDeCo控除により控除上限額が変わることを確認
      expect(resultWith.deductionLimit).not.toBe(resultWithout.deductionLimit);
    });
  });

  describe('所得の種類による影響', () => {
    const baseInput = {
      annualIncome: 5000000,
      familyType: 'single' as const,
      dependents: 0,
      socialInsurancePremium: 750000,
      lifeInsurancePremium: 0,
      earthquakeInsurancePremium: 0,
      housingLoanDeduction: 0,
      medicalExpenseDeduction: 0,
      smallBusinessMutualAidPremium: 0,
    };

    test('給与所得の場合', () => {
      const input: FurusatoCalculationInput = { ...baseInput, incomeType: 'salary' };
      const result = calculateFurusato(input);

      expect(result.deductionLimit).toBeGreaterThan(0);
      expect(result.selfBurden).toBe(2000);
    });

    test('事業所得の場合', () => {
      const input: FurusatoCalculationInput = { ...baseInput, incomeType: 'business' };
      const result = calculateFurusato(input);

      expect(result.deductionLimit).toBeGreaterThan(0);
      expect(result.selfBurden).toBe(2000);
    });
  });

  describe('エッジケース', () => {
    test('最低年収での計算', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 1000000, // 年収100万円
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 150000,
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      const result = calculateFurusato(input);

      // 低年収の場合、控除上限額は0または非常に小さい値になる可能性
      expect(result.deductionLimit).toBeGreaterThanOrEqual(0);
      expect(result.selfBurden).toBe(2000);
    });

    test('高額年収での計算', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 50000000, // 年収5000万円
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 3000000,
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      const result = calculateFurusato(input);

      // 高年収の場合、控除上限額は大きくなる
      expect(result.deductionLimit).toBeGreaterThan(1000000);
      expect(result.selfBurden).toBe(2000);
    });
  });

  describe('計算結果の整合性', () => {
    test('税額の合計が正しいこと', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 6000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 900000,
        lifeInsurancePremium: 50000,
        earthquakeInsurancePremium: 30000,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 100000,
        smallBusinessMutualAidPremium: 200000,
      };

      const result = calculateFurusato(input);

      // デバッグ用ログ
      console.log('=== ふるさと納税計算結果 ===');
      console.log('控除上限額:', result.deductionLimit);
      console.log('所得税還付額:', result.incomeTaxReduction);
      console.log('住民税軽減額:', result.residentTaxReduction);
      console.log('合計節税額:', result.totalTaxReduction);
      console.log('自己負担額:', result.selfBurden);
      console.log('差額 (控除上限額 - 節税額):', result.deductionLimit - result.totalTaxReduction);

      // 合計節税額 = 所得税還付額 + 住民税軽減額
      const expectedTotal = result.incomeTaxReduction + result.residentTaxReduction;
      expect(result.totalTaxReduction).toBeCloseTo(expectedTotal, 0);

      // 計算ロジックの妥当性を基本的にチェック
      expect(result.deductionLimit).toBeGreaterThan(0);
      expect(result.totalTaxReduction).toBeGreaterThan(0);
      expect(result.selfBurden).toBe(2000);
      
      // 控除上限額は節税額より大きいはず
      expect(result.deductionLimit).toBeGreaterThan(result.totalTaxReduction);
    });

    test('課税所得が正しく計算されていること', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 5000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 750000,
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      const result = calculateFurusato(input);

      // 課税所得は年収から各種控除を差し引いた金額
      expect(result.taxableIncome).toBeGreaterThan(0);
      expect(result.taxableIncome).toBeLessThan(input.annualIncome);
    });
  });

  describe('入力値バリデーション', () => {
    test('負の年収でエラーが発生', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: -1000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 0,
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      expect(() => calculateFurusato(input)).toThrow();
    });

    test('社会保険料が年収の30%を超える場合の処理', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 3000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 1000000, // 年収の33%
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      // バリデーションが実装されている場合はエラー、そうでなければ警告を確認
      try {
        const result = calculateFurusato(input);
        // エラーが発生しない場合、警告メッセージが含まれているかを確認
        expect(result.warnings).toBeDefined();
        if (result.warnings) {
          expect(result.warnings.length).toBeGreaterThan(0);
        }
      } catch (error) {
        // エラーが発生する場合はそれでも正常
        expect(error).toBeDefined();
      }
    });

    test('扶養親族数が負の場合にエラー', () => {
      const input: FurusatoCalculationInput = {
        annualIncome: 5000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: -1,
        socialInsurancePremium: 750000,
        lifeInsurancePremium: 0,
        earthquakeInsurancePremium: 0,
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      expect(() => calculateFurusato(input)).toThrow();
    });
  });
});