import { furusatoCalculationSchema, FurusatoCalculationFormData } from '../../validations';

describe('ふるさと納税バリデーション', () => {
  const baseValidInput: FurusatoCalculationFormData = {
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

  describe('基本的なバリデーション', () => {
    test('有効な入力データが正常に通る', () => {
      const result = furusatoCalculationSchema.safeParse(baseValidInput);
      expect(result.success).toBe(true);
    });

    test('年収が負の値でエラー', () => {
      const input = { ...baseValidInput, annualIncome: -1000000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('年収は0以上');
      }
    });

    test('年収が極端に大きい値でエラー', () => {
      const input = { ...baseValidInput, annualIncome: 200000000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
    });

    test('扶養親族数が負の値でエラー', () => {
      const input = { ...baseValidInput, dependents: -1 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
    });
  });

  describe('社会保険料控除額のバリデーション', () => {
    test('社会保険料が年収の30%を超える場合エラー', () => {
      const input = { ...baseValidInput, annualIncome: 3000000, socialInsurancePremium: 1000000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('社会保険料控除額が年収に対して高すぎます'))).toBe(true);
      }
    });

    test('社会保険料が年収の30%ちょうどなら通る', () => {
      const input = { ...baseValidInput, annualIncome: 5000000, socialInsurancePremium: 1500000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });

    test('社会保険料が年収の5%未満で警告', () => {
      const input = { ...baseValidInput, annualIncome: 5000000, socialInsurancePremium: 200000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('社会保険料控除額が年収に対して低すぎる'))).toBe(true);
      }
    });
  });

  describe('生命保険料控除のバリデーション', () => {
    test('生命保険料が8万円を超える場合に警告', () => {
      const input = { ...baseValidInput, lifeInsurancePremium: 900000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('生命保険料が年間8万円を超えています'))).toBe(true);
      }
    });

    test('生命保険料が8万円以下なら通る', () => {
      const input = { ...baseValidInput, lifeInsurancePremium: 80000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('地震保険料控除のバリデーション', () => {
    test('地震保険料が5万円を超える場合エラー', () => {
      const input = { ...baseValidInput, earthquakeInsurancePremium: 60000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('地震保険料控除は年間5万円が上限'))).toBe(true);
      }
    });

    test('地震保険料が5万円以下なら通る', () => {
      const input = { ...baseValidInput, earthquakeInsurancePremium: 50000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('iDeCo（小規模企業共済等掛金控除）のバリデーション', () => {
    test('iDeCo掛金が会社員の限度額を超える場合に警告', () => {
      const input = { ...baseValidInput, incomeType: 'salary' as const, smallBusinessMutualAidPremium: 900000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('iDeCoの年間拠出限度額'))).toBe(true);
      }
    });

    test('iDeCo掛金が自営業者の限度額内なら通る', () => {
      const input = { ...baseValidInput, incomeType: 'business' as const, smallBusinessMutualAidPremium: 816000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('住宅ローン控除のバリデーション', () => {
    test('住宅ローン控除が年収の10%を超える場合警告', () => {
      const input = { ...baseValidInput, annualIncome: 4000000, housingLoanDeduction: 500000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('住宅ローン控除額が年収に対して高すぎる'))).toBe(true);
      }
    });

    test('住宅ローン控除が年収の10%以下なら通る', () => {
      const input = { ...baseValidInput, annualIncome: 5000000, housingLoanDeduction: 400000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('医療費控除のバリデーション', () => {
    test('医療費控除が年収の20%を超える場合警告', () => {
      const input = { ...baseValidInput, annualIncome: 4000000, medicalExpenseDeduction: 900000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('医療費控除額が年収に対して高すぎる'))).toBe(true);
      }
    });

    test('医療費控除が年収の20%以下なら通る', () => {
      const input = { ...baseValidInput, annualIncome: 5000000, medicalExpenseDeduction: 800000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('低所得者への警告', () => {
    test('年収200万円未満で警告', () => {
      const input = { ...baseValidInput, annualIncome: 1800000, socialInsurancePremium: 200000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('ふるさと納税の控除効果が限定的'))).toBe(true);
      }
    });
  });

  describe('扶養親族数と年収の妥当性チェック', () => {
    test('扶養親族がいて年収が低い場合警告', () => {
      const input = { ...baseValidInput, annualIncome: 2500000, dependents: 2, socialInsurancePremium: 300000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.some((e: any) => e.message.includes('扶養親族2人に対して年収が低い'))).toBe(true);
      }
    });

    test('扶養親族がいても年収が十分なら通る', () => {
      const input = { ...baseValidInput, annualIncome: 6000000, dependents: 2, socialInsurancePremium: 900000 };
      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(true);
    });
  });

  describe('複合パターンのテスト', () => {
    test('複数のバリデーションエラーが同時に発生', () => {
      const input: FurusatoCalculationFormData = {
        annualIncome: 3000000,
        incomeType: 'salary',
        familyType: 'single',
        dependents: 0,
        socialInsurancePremium: 1100000, // 年収の36.7%で30%上限を超える
        lifeInsurancePremium: 900000, // 8万円を超える
        earthquakeInsurancePremium: 60000, // 5万円を超える
        housingLoanDeduction: 0,
        medicalExpenseDeduction: 0,
        smallBusinessMutualAidPremium: 0,
      };

      const result = furusatoCalculationSchema.safeParse(input);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
        expect(result.error.issues.some((e: any) => e.message.includes('社会保険料控除額が年収に対して高すぎます'))).toBe(true);
        expect(result.error.issues.some((e: any) => e.message.includes('生命保険料が年間8万円を超えています'))).toBe(true);
        expect(result.error.issues.some((e: any) => e.message.includes('地震保険料控除は年間5万円が上限'))).toBe(true);
      }
    });
  });
});