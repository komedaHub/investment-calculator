import { Page, expect } from '@playwright/test';

/**
 * 数値文字列から数値を抽出するヘルパー関数
 */
export function extractNumber(text: string | null): number {
  if (!text) return 0;
  return parseInt(text.replace(/[^\d]/g, '')) || 0;
}

/**
 * フォーム入力の共通ヘルパー関数
 */
export class FormHelper {
  constructor(private page: Page) {}

  /**
   * ラベルでフォーム項目を入力
   */
  async fillByLabel(label: string, value: string) {
    await this.page.getByLabel(new RegExp(label, 'i')).fill(value);
  }

  /**
   * セレクトボックスで選択
   */
  async selectByLabel(triggerLabel: string, optionText: string) {
    await this.page.locator(`button:has-text("${triggerLabel}"), button[role="combobox"]`).first().click();
    await this.page.getByRole('option', { name: new RegExp(optionText, 'i') }).click();
  }

  /**
   * ラジオボタンを選択
   */
  async clickRadio(radioName: string) {
    await this.page.getByRole('radio', { name: new RegExp(radioName, 'i') }).click();
  }

  /**
   * 計算ボタンを押す
   */
  async clickCalculate(buttonText: string = '計算') {
    await this.page.getByRole('button', { name: new RegExp(buttonText, 'i') }).click();
  }
}

/**
 * 基本的な要素の表示確認
 */
export async function expectElementsVisible(page: Page, elements: string[]) {
  for (const element of elements) {
    await expect(page.getByText(new RegExp(element, 'i'))).toBeVisible();
  }
}

/**
 * テスト用のデフォルト値
 */
export const DEFAULT_VALUES = {
  compound: {
    principal: '1000000',
    annualRate: '5',
    years: '10',
    monthlyContribution: '50000',
  },
  furusato: {
    annualIncome: '500',
    socialInsurance: '75',
    dependents: '0',
  },
} as const;

/**
 * 待機時間
 */
export const TIMEOUTS = {
  calculation: 2000, // 計算結果表示まで
  navigation: 1000,  // ページ遷移
} as const;