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
    .max(50000, '地震保険料控除は5万円が上限です')
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
    .max(816000, 'iDeCoの年間拠出限度額を超えています')
    .optional(),
}).superRefine((data, ctx) => {
  // 年収と社会保険料のバランスチェック（30%上限）
  if (data.socialInsurancePremium > data.annualIncome * 0.3) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '社会保険料控除額が年収に対して高すぎます（年収の30%以下にしてください）',
      path: ['socialInsurancePremium'],
    });
  }

  // 社会保険料の最低額チェック（年収に対して極端に低い場合の警告）
  if (data.annualIncome > 1000000 && data.socialInsurancePremium < data.annualIncome * 0.05) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '社会保険料控除額が年収に対して低すぎる可能性があります（一般的に年収の10-15%程度）',
      path: ['socialInsurancePremium'],
    });
  }

  // 生命保険料控除の上限チェック（新制度：年間8万円超の場合は控除額4万円が上限）
  if (data.lifeInsurancePremium && data.lifeInsurancePremium > 800000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '生命保険料が年間8万円を超えています。控除額は4万円が上限となります',
      path: ['lifeInsurancePremium'],
    });
  }

  // 地震保険料控除の上限チェック（年間5万円が上限）
  if (data.earthquakeInsurancePremium && data.earthquakeInsurancePremium > 50000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '地震保険料控除は年間5万円が上限です',
      path: ['earthquakeInsurancePremium'],
    });
  }

  // iDeCo（小規模企業共済等掛金控除）の年間上限チェック
  if (data.smallBusinessMutualAidPremium && data.smallBusinessMutualAidPremium > 816000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'iDeCoの年間拠出限度額は職業によって異なります（会社員：年額27.6万円、自営業：年額81.6万円）',
      path: ['smallBusinessMutualAidPremium'],
    });
  }

  // 住宅ローン控除の妥当性チェック（年収に対して過大でないか）
  if (data.housingLoanDeduction && data.housingLoanDeduction > data.annualIncome * 0.1) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '住宅ローン控除額が年収に対して高すぎる可能性があります',
      path: ['housingLoanDeduction'],
    });
  }

  // 医療費控除の妥当性チェック（年収に対して過大でないか）
  if (data.medicalExpenseDeduction && data.medicalExpenseDeduction > data.annualIncome * 0.2) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '医療費控除額が年収に対して高すぎる可能性があります',
      path: ['medicalExpenseDeduction'],
    });
  }

  // 低所得者への警告
  if (data.annualIncome < 2000000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: '年収が200万円未満の場合、ふるさと納税の控除効果が限定的になる可能性があります',
      path: ['annualIncome'],
    });
  }

  // 扶養親族数と年収の妥当性チェック
  if (data.dependents > 0 && data.annualIncome < 3000000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `扶養親族${data.dependents}人に対して年収が低い可能性があります。扶養控除の適用要件をご確認ください`,
      path: ['dependents'],
    });
  }
});

export type FurusatoCalculationFormData = z.infer<typeof furusatoCalculationSchema>;