import { test, expect } from '@playwright/test';

test.describe('ふるさと納税計算機のE2Eテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/furusato');
  });

  test('ふるさと納税計算機ページの基本表示', async ({ page }) => {
    // ページタイトルの確認
    await expect(page).toHaveTitle(/ふるさと納税計算機/);
    
    // フォームの表示確認
    await expect(page.getByLabel(/年収/)).toBeVisible();
    await expect(page.getByLabel(/所得の種類/)).toBeVisible();
    await expect(page.getByLabel(/配偶者の状況/)).toBeVisible();
    await expect(page.getByLabel(/扶養親族数/)).toBeVisible();
    await expect(page.getByLabel(/社会保険料控除額/)).toBeVisible();
    
    // 計算ボタンの確認
    await expect(page.getByRole('button', { name: /控除上限額を計算する/ })).toBeVisible();
  });

  test('基本的なふるさと納税計算の実行', async ({ page }) => {
    // 基本情報入力
    await page.getByLabel(/年収/).fill('500'); // 万円単位
    
    // 所得の種類選択（給与所得）
    await page.getByRole('radio', { name: /給与所得/ }).click();
    
    // 配偶者の状況選択
    await page.locator('button[role="combobox"]').click();
    await page.getByRole('option', { name: /独身/ }).click();
    
    // 扶養親族数
    await page.getByLabel(/扶養親族数/).fill('0');
    
    // 社会保険料控除額
    await page.getByLabel(/社会保険料控除額/).fill('75');

    // 計算実行
    await page.getByRole('button', { name: /控除上限額を計算する/ }).click();

    // 結果の表示確認
    await expect(page.getByText(/控除上限額/)).toBeVisible();
    await expect(page.getByText(/おすすめ寄附金額/)).toBeVisible();
    await expect(page.getByText(/自己負担額/)).toBeVisible();
    await expect(page.getByText(/2,000円/)).toBeVisible(); // 自己負担額は必ず2,000円

    // 計算結果の妥当性確認
    const deductionLimit = await page.locator('[data-testid="deduction-limit"]').textContent();
    const recommendedDonation = await page.locator('[data-testid="recommended-donation"]').textContent();
    
    if (deductionLimit && recommendedDonation) {
      const limitValue = parseInt(deductionLimit.replace(/[^\d]/g, ''));
      const recommendedValue = parseInt(recommendedDonation.replace(/[^\d]/g, ''));
      
      // おすすめ寄附金額は控除上限額の90%程度であることを確認
      expect(recommendedValue).toBeLessThan(limitValue);
      expect(recommendedValue).toBeGreaterThan(limitValue * 0.8);
    }
  });

  test('詳細オプションの表示・非表示', async ({ page }) => {
    // 詳細オプションのスイッチ確認
    const advancedSwitch = page.getByLabel(/詳細な控除項目を入力する/);
    await expect(advancedSwitch).toBeVisible();

    // 初期状態では詳細項目が非表示
    await expect(page.getByLabel(/生命保険料控除/)).not.toBeVisible();
    await expect(page.getByLabel(/地震保険料控除/)).not.toBeVisible();

    // スイッチを有効にする
    await advancedSwitch.click();

    // 詳細項目が表示される
    await expect(page.getByLabel(/生命保険料控除/)).toBeVisible();
    await expect(page.getByLabel(/地震保険料控除/)).toBeVisible();
    await expect(page.getByLabel(/住宅ローン控除/)).toBeVisible();
    await expect(page.getByLabel(/医療費控除/)).toBeVisible();
    await expect(page.getByLabel(/小規模企業共済等掛金控除/)).toBeVisible();
  });

  test('バリデーションエラーの表示', async ({ page }) => {
    // 年収に異常な値を入力
    await page.getByLabel(/年収/).fill('0');
    
    // 社会保険料を異常に高い値に設定
    await page.getByLabel(/社会保険料控除額/).fill('1000'); // 年収の10倍

    // 計算実行
    await page.getByRole('button', { name: /控除上限額を計算する/ }).click();

    // バリデーションエラーメッセージの表示確認
    await expect(page.getByText(/社会保険料控除額が年収に対して高すぎます/)).toBeVisible();
  });

  test('住宅ローン控除との併用計算', async ({ page }) => {
    // 基本情報入力
    await page.getByLabel(/年収/).fill('600');
    await page.getByRole('radio', { name: /給与所得/ }).click();
    
    await page.locator('button[role="combobox"]').click();
    await page.getByRole('option', { name: /独身/ }).click();
    
    await page.getByLabel(/扶養親族数/).fill('0');
    await page.getByLabel(/社会保険料控除額/).fill('90');

    // 詳細オプションを有効化
    await page.getByLabel(/詳細な控除項目を入力する/).click();
    
    // 住宅ローン控除を入力
    await page.getByLabel(/住宅ローン控除/).fill('30');

    // 計算実行
    await page.getByRole('button', { name: /控除上限額を計算する/ }).click();

    // 住宅ローン控除の影響に関する警告メッセージの確認
    await expect(page.locator('[data-testid="warnings"]')).toBeVisible();
  });

  test('家族構成による計算結果の違い', async ({ page }) => {
    // 独身の場合の計算
    await page.getByLabel(/年収/).fill('500');
    await page.getByRole('radio', { name: /給与所得/ }).click();
    
    await page.locator('button[role="combobox"]').click();
    await page.getByRole('option', { name: /独身/ }).click();
    
    await page.getByLabel(/扶養親族数/).fill('0');
    await page.getByLabel(/社会保険料控除額/).fill('75');

    await page.getByRole('button', { name: /控除上限額を計算する/ }).click();
    
    const singleResult = await page.locator('[data-testid="deduction-limit"]').textContent();

    // 配偶者ありの場合に変更
    await page.locator('button[role="combobox"]').click();
    await page.getByRole('option', { name: /配偶者あり（年収103万円以下）/ }).click();

    await page.getByRole('button', { name: /控除上限額を計算する/ }).click();
    
    const marriedResult = await page.locator('[data-testid="deduction-limit"]').textContent();

    // 家族構成により結果が異なることを確認
    expect(singleResult).not.toBe(marriedResult);
  });
});