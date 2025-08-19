import { calculateCompound } from '../compound';
import { CompoundCalculationInput } from '@/types/calculation';

describe('複利計算ロジック', () => {
  describe('基本的な複利計算', () => {
    test('元本のみの複利計算（月額積立なし）', () => {
      const input: CompoundCalculationInput = {
        principal: 1000000, // 100万円
        monthlyContribution: 0,
        annualRate: 0.05, // 5%
        years: 10,
      };

      const result = calculateCompound(input);

      // 100万円を年利5%で10年運用（月複利）
      // 期待値: 1,000,000 × (1 + 0.05/12)^(12×10) ≈ 1,647,009円
      expect(result.futureValue).toBeCloseTo(1647009, -2);
      expect(result.totalInvestment).toBe(1000000);
      expect(result.totalInterest).toBeCloseTo(647009, -2);
      expect(result.monthlyBreakdown).toHaveLength(120); // 10年 × 12ヶ月
    });

    test('月額積立のみの複利計算（元本なし）', () => {
      const input: CompoundCalculationInput = {
        principal: 0,
        monthlyContribution: 50000, // 月5万円
        annualRate: 0.05, // 5%
        years: 10,
      };

      const result = calculateCompound(input);

      // 月5万円を年利5%で10年積立
      expect(result.futureValue).toBeGreaterThan(6000000); // 元本より大きい
      expect(result.totalInvestment).toBe(6000000); // 50,000 × 12 × 10
      expect(result.totalInterest).toBeGreaterThan(0);
    });

    test('元本と月額積立の組み合わせ', () => {
      const input: CompoundCalculationInput = {
        principal: 1000000, // 100万円
        monthlyContribution: 30000, // 月3万円
        annualRate: 0.03, // 3%
        years: 20,
      };

      const result = calculateCompound(input);

      // 総拠出額の検証
      const expectedContributions = 1000000 + (30000 * 12 * 20);
      expect(result.totalInvestment).toBe(expectedContributions);
      
      // 最終金額が拠出額より大きいことを確認
      expect(result.futureValue).toBeGreaterThan(expectedContributions);
      
      // 利息が正の値であることを確認
      expect(result.totalInterest).toBeGreaterThan(0);
    });
  });

  describe('エッジケース', () => {
    test('年利0%の場合', () => {
      const input: CompoundCalculationInput = {
        principal: 1000000,
        monthlyContribution: 10000,
        annualRate: 0, // 0%
        years: 5,
      };

      const result = calculateCompound(input);

      // 利息が発生しないため、最終金額は拠出額と同じ
      const expectedAmount = 1000000 + (10000 * 12 * 5);
      expect(result.futureValue).toBe(expectedAmount);
      expect(result.totalInterest).toBe(0);
    });

    test('期間1年の場合', () => {
      const input: CompoundCalculationInput = {
        principal: 1000000,
        monthlyContribution: 0,
        annualRate: 0.05,
        years: 1,
      };

      const result = calculateCompound(input);

      expect(result.futureValue).toBeGreaterThan(1000000);
      expect(result.totalInterest).toBeGreaterThan(0);
      expect(result.monthlyBreakdown).toHaveLength(12); // 1年 × 12ヶ月
    });

    test('高い利率の場合（10%）', () => {
      const input: CompoundCalculationInput = {
        principal: 1000000,
        monthlyContribution: 0,
        annualRate: 0.10, // 10%
        years: 10,
      };

      const result = calculateCompound(input);

      // 100万円を年利10%で10年運用
      expect(result.futureValue).toBeGreaterThan(2500000);
      expect(result.totalInterest).toBeGreaterThan(1500000);
    });
  });

  describe('monthly breakdownの検証', () => {
    test('monthly breakdownの構造と値の正確性', () => {
      const input: CompoundCalculationInput = {
        principal: 1000000,
        monthlyContribution: 10000,
        annualRate: 0.05,
        years: 3,
      };

      const result = calculateCompound(input);

      // 月次データが正しい長さであることを確認
      expect(result.monthlyBreakdown).toHaveLength(36); // 3年 × 12ヶ月

      // 各月で金額が増加していることを確認
      for (let i = 1; i < result.monthlyBreakdown.length; i++) {
        expect(result.monthlyBreakdown[i].total).toBeGreaterThanOrEqual(result.monthlyBreakdown[i - 1].total);
      }

      // 最終月のデータが結果と一致することを確認
      const finalMonth = result.monthlyBreakdown[result.monthlyBreakdown.length - 1];
      expect(finalMonth.total).toBe(result.futureValue);
    });
  });

  describe('入力値バリデーション', () => {
    test('負の元本でエラーが発生', () => {
      const input: CompoundCalculationInput = {
        principal: -100000,
        monthlyContribution: 0,
        annualRate: 0.05,
        years: 10,
      };

      expect(() => calculateCompound(input)).toThrow();
    });

    test('負の月額積立でエラーが発生', () => {
      const input: CompoundCalculationInput = {
        principal: 1000000,
        monthlyContribution: -10000,
        annualRate: 0.05,
        years: 10,
      };

      expect(() => calculateCompound(input)).toThrow();
    });

    test('0年以下の期間でエラーが発生', () => {
      const input: CompoundCalculationInput = {
        principal: 1000000,
        monthlyContribution: 0,
        annualRate: 0.05,
        years: 0,
      };

      expect(() => calculateCompound(input)).toThrow();
    });
  });
});