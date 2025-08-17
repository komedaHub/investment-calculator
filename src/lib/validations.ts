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