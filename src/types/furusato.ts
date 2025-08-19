// ふるさと納税関連の型定義

// 家族構成の種類
export type FamilyType = 
  | 'single' // 独身
  | 'married_no_income' // 配偶者なし（配偶者控除あり）
  | 'married_with_income' // 配偶者あり（配偶者特別控除対象）
  | 'married_high_income'; // 配偶者あり（高収入、控除なし）

// 所得の種類
export type IncomeType = 'salary' | 'business';

// 入力データの型
export interface FurusatoCalculationInput {
  // 基本情報
  annualIncome: number; // 年収
  incomeType: IncomeType; // 所得の種類
  familyType: FamilyType; // 家族構成
  dependents: number; // 扶養親族数

  // 社会保険料等（必須）
  socialInsurancePremium: number; // 社会保険料控除額

  // その他の控除（オプション）
  lifeInsurancePremium?: number; // 生命保険料控除
  earthquakeInsurancePremium?: number; // 地震保険料控除
  housingLoanDeduction?: number; // 住宅ローン控除
  medicalExpenseDeduction?: number; // 医療費控除
  smallBusinessMutualAidPremium?: number; // 小規模企業共済等掛金控除
}

// フォーム用のデータ型
export interface FurusatoCalculationFormData extends FurusatoCalculationInput {
  // フォーム固有のプロパティがあれば追加
}

// 計算結果の型
export interface FurusatoCalculationResult {
  // メイン結果
  deductionLimit: number; // 控除上限額
  recommendedDonation: number; // おすすめ寄附金額（上限の90%）
  selfBurden: number; // 実質自己負担額（通常2000円）

  // 詳細内訳
  incomeTaxReduction: number; // 所得税還付額
  residentTaxReduction: number; // 住民税軽減額
  totalTaxReduction: number; // 合計節税額

  // 計算に使用した値
  taxableIncome: number; // 課税所得
  incomeTaxRate: number; // 所得税率
  residentTaxRate: number; // 住民税率（通常10%）

  // エラーや警告
  warnings?: string[]; // 計算時の注意事項
  hasHousingLoanConflict?: boolean; // 住宅ローン控除との競合
}

// 年収別シミュレーション用の型
export interface IncomeSimulation {
  income: number;
  deductionLimit: number;
  effectiveRate: number; // 実効控除率
}

// グラフ表示用のデータ型
export interface FurusatoChartDataPoint {
  donationAmount: number; // 寄附金額
  selfBurden: number; // 自己負担額
  taxReduction: number; // 節税額
  effectiveRate: number; // 実効率
}

// 住宅ローン控除併用時の詳細計算結果
export interface HousingLoanCombinationResult {
  normalDeductionLimit: number; // 通常の控除上限額
  adjustedDeductionLimit: number; // 住宅ローン控除考慮後の上限額
  reductionAmount: number; // 減額
  conflictWarning: string; // 競合警告メッセージ
}

// 控除の種類別内訳
export interface DeductionBreakdown {
  // 所得控除
  basicDeduction: number; // 基礎控除
  socialInsuranceDeduction: number; // 社会保険料控除
  spouseDeduction: number; // 配偶者控除・配偶者特別控除
  dependentDeduction: number; // 扶養控除
  lifeInsuranceDeduction: number; // 生命保険料控除
  earthquakeInsuranceDeduction: number; // 地震保険料控除
  medicalExpenseDeduction: number; // 医療費控除
  smallBusinessMutualAidDeduction: number; // 小規模企業共済等掛金控除
  
  // 税額控除
  housingLoanDeduction: number; // 住宅ローン控除
  furusatoDeduction: number; // ふるさと納税控除
}

// バリデーションエラーの型
export interface FurusatoValidationError {
  field: keyof FurusatoCalculationInput;
  message: string;
  code: string;
}

// 計算設定・定数
export interface FurusatoCalculationConfig {
  // 基礎控除額
  basicDeductionAmount: number; // 48万円（2020年分以降）
  
  // 各種控除の上限額
  lifeInsuranceDeductionMax: number; // 生命保険料控除の上限
  earthquakeInsuranceDeductionMax: number; // 地震保険料控除の上限
  
  // 税率
  residentTaxRate: number; // 住民税率 10%
  
  // ふるさと納税の自己負担額
  selfBurdenAmount: number; // 2000円
  
  // 安全係数（おすすめ寄附金額の計算用）
  safetyFactor: number; // 0.9（90%）
}