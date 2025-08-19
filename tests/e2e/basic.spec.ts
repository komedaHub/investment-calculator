import { test, expect } from '@playwright/test';

test.describe('基本的なE2Eテスト', () => {
  test('開発サーバーが正常に動作している', async ({ page }) => {
    // ホームページにアクセス
    await page.goto('/');
    
    // ページが読み込まれることを確認
    await expect(page).toHaveURL(/.*localhost:3001/);
    
    // HTMLのタイトルタグが存在することを確認
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
  });

  test('ナビゲーションが動作する', async ({ page }) => {
    await page.goto('/');
    
    // 複利計算ページへのリンクがあることを確認
    const compoundLink = page.locator('a[href*="compound"]');
    if (await compoundLink.count() > 0) {
      await compoundLink.first().click();
      await expect(page).toHaveURL(/.*compound/);
    }
  });
});