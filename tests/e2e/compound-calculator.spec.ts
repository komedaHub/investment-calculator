import { test, expect } from '@playwright/test';

test.describe('複利計算機のE2Eテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/compound');
  });

  test('複利計算機ページの基本表示', async ({ page }) => {
    // ページタイトルの確認
    await expect(page).toHaveTitle(/複利計算機/);
    
    // フォームの表示確認
    await expect(page.getByLabel(/元本/)).toBeVisible();
    await expect(page.getByLabel(/年利率/)).toBeVisible();
    await expect(page.getByLabel(/期間/)).toBeVisible();
    await expect(page.getByLabel(/月々の積立額/)).toBeVisible();
    
    // 計算ボタンの確認
    await expect(page.getByRole('button', { name: /計算する/ })).toBeVisible();
  });

  test('基本的な複利計算の実行', async ({ page }) => {
    // フォーム入力
    await page.getByLabel(/元本/).fill('1000000');
    await page.getByLabel(/年利率/).fill('5');
    await page.getByLabel(/期間/).fill('10');
    await page.getByLabel(/月々の積立額/).fill('50000');

    // 計算実行
    await page.getByRole('button', { name: /計算する/ }).click();

    // 結果の表示確認
    await expect(page.getByText(/最終金額/)).toBeVisible();
    await expect(page.getByText(/総投資額/)).toBeVisible();
    await expect(page.getByText(/運用益/)).toBeVisible();

    // 数値の妥当性チェック（元本より最終金額が大きいことを確認）
    const finalAmount = await page.locator('[data-testid="final-amount"]').textContent();
    const totalInvestment = await page.locator('[data-testid="total-investment"]').textContent();
    
    // テキストから数値を抽出して比較
    const finalValue = parseInt(finalAmount?.replace(/[^\d]/g, '') || '0');
    const investmentValue = parseInt(totalInvestment?.replace(/[^\d]/g, '') || '0');
    
    expect(finalValue).toBeGreaterThan(investmentValue);
  });

  test('無効な入力値のバリデーション', async ({ page }) => {
    // 負の値を入力
    await page.getByLabel(/元本/).fill('-100000');
    await page.getByRole('button', { name: /計算する/ }).click();

    // エラーメッセージの表示確認
    await expect(page.getByText(/0以上である必要があります/)).toBeVisible();
  });

  test('チャートの表示確認', async ({ page }) => {
    // フォーム入力
    await page.getByLabel(/元本/).fill('1000000');
    await page.getByLabel(/年利率/).fill('5');
    await page.getByLabel(/期間/).fill('10');

    // 計算実行
    await page.getByRole('button', { name: /計算する/ }).click();

    // チャートの表示確認
    await expect(page.locator('[data-testid="growth-chart"]')).toBeVisible();
  });

  test('データテーブルの表示確認', async ({ page }) => {
    // フォーム入力
    await page.getByLabel(/元本/).fill('1000000');
    await page.getByLabel(/年利率/).fill('3');
    await page.getByLabel(/期間/).fill('5');

    // 計算実行
    await page.getByRole('button', { name: /計算する/ }).click();

    // テーブルの表示確認
    await expect(page.locator('table')).toBeVisible();
    
    // テーブルヘッダーの確認
    await expect(page.getByText('年')).toBeVisible();
    await expect(page.getByText('投資累計額')).toBeVisible();
    await expect(page.getByText('運用益')).toBeVisible();
    await expect(page.getByText('合計額')).toBeVisible();
  });
});