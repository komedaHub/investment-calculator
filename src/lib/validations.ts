import { z } from 'zod';

export const compoundCalculationSchema = z.object({
  principal: z
    .number()
    .min(0, '元本は0以上である必要があります')
    .max(1000000000, '元本が大きすぎます'),
  annualRate: z
    .number()
    .min(0, '年利率は0以上である必要があります')
    .max(30, '年利率は30%以下である必要があります'),
  years: z
    .number()
    .min(1, '期間は1年以上である必要があります')
    .max(50, '期間は50年以下である必要があります'),
  monthlyContribution: z
    .number()
    .min(0, '月額投資額は0以上である必要があります')
    .max(10000000, '月額投資額が大きすぎます')
    .optional(),
});

export type CompoundCalculationFormData = z.infer<typeof compoundCalculationSchema>;

// ふるさと納税計算のバリデーションスキーマ
export const furusatoCalculationSchema = z.object({
  // 基本情報（必須）
  annualIncome: z
    .number()
    .min(0, '年収は0以上である必要があります')
    .max(100000000, '年収が大きすぎます'),
  incomeType: z.enum(['salary', 'business'])
    .refine((val) => val !== undefined, '所得の種類を選択してください'),
  familyType: z.enum(['single', 'married_no_income', 'married_with_income', 'married_high_income'])
    .refine((val) => val !== undefined, '家族構成を選択してください'),
  dependents: z
    .number()
    .int('扶養親族数は整数である必要があります')
    .min(0, '扶養親族数は0以上である必要があります')
    .max(20, '扶養親族数は20人以下である必要があります'),
  socialInsurancePremium: z
    .number()
    .min(0, '社会保険料控除額は0以上である必要があります')
    .max(10000000, '社会保険料控除額が大きすぎます'),

  // オプション項目
  lifeInsurancePremium: z
    .number()
    .min(0, '生命保険料控除は0以上である必要があります')
    .max(1000000, '生命保険料控除が大きすぎます')
    .optional(),
  earthquakeInsurancePremium: z
    .number()
    .min(0, '地震保険料控除は0以上である必要があります')
    .max(500000, '地震保険料控除が大きすぎます')
    .optional(),
  housingLoanDeduction: z
    .number()
    .min(0, '住宅ローン控除は0以上である必要があります')
    .max(5000000, '住宅ローン控除が大きすぎます')
    .optional(),
  medicalExpenseDeduction: z
    .number()
    .min(0, '医療費控除は0以上である必要があります')
    .max(10000000, '医療費控除が大きすぎます')
    .optional(),
  smallBusinessMutualAidPremium: z
    .number()
    .min(0, '小規模企業共済等掛金控除は0以上である必要があります')
    .max(1000000, '小規模企業共済等掛金控除が大きすぎます')
    .optional(),
}).refine((data) => {
  // 年収と社会保険料のバランスチェック
  if (data.socialInsurancePremium > data.annualIncome * 0.3) {
    return false;
  }
  return true;
}, {
  message: '社会保険料控除額が年収に対して高すぎます（年収の30%以下にしてください）',
  path: ['socialInsurancePremium'],
});

export type FurusatoCalculationFormData = z.infer<typeof furusatoCalculationSchema>;