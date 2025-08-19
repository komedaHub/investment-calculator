import { test, expect } from '@playwright/test';

test('ホームページの基本表示テスト', async ({ page }) => {
  await page.goto('/');

  // ページタイトルの確認
  await expect(page).toHaveTitle(/投資かんたん計算/);

  // ヘッダーの確認
  const header = page.getByRole('banner');
  await expect(header).toBeVisible();

  // メイン見出しの確認
  const mainHeading = page.getByRole('heading', { level: 1 });
  await expect(mainHeading).toBeVisible();

  // ナビゲーションリンクの確認
  await expect(page.getByRole('link', { name: /複利計算/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /ふるさと納税/ })).toBeVisible();
});

test('レスポンシブデザインの確認', async ({ page }) => {
  // デスクトップサイズ
  await page.setViewportSize({ width: 1200, height: 800 });
  await page.goto('/');
  
  // モバイルサイズ
  await page.setViewportSize({ width: 375, height: 667 });
  
  // モバイルでもメイン要素が表示されることを確認
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('banner')).toBeVisible();
});