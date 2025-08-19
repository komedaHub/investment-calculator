import type { Meta, StoryObj } from '@storybook/react';
import { ErrorMessage } from './error-message';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Common/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'エラーメッセージ表示コンポーネント。エラー、警告、情報メッセージを適切なスタイルで表示します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['error', 'warning', 'info'],
      description: 'メッセージの種類',
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'アイコンを表示するかどうか',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Error: Story = {
  args: {
    type: 'error',
    title: 'エラーが発生しました',
    message: '入力値に問題があります。正しい値を入力してください。',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: '注意事項',
    message: 'この計算結果は概算値です。実際の運用結果と異なる場合があります。',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: '計算完了',
    message: '複利計算が正常に完了しました。',
  },
};

export const WithoutTitle: Story = {
  args: {
    type: 'error',
    message: 'タイトルなしのエラーメッセージです。',
  },
};

export const WithoutIcon: Story = {
  args: {
    type: 'error',
    title: 'アイコンなし',
    message: 'アイコンを表示しないエラーメッセージです。',
    showIcon: false,
  },
};

export const LongMessage: Story = {
  args: {
    type: 'error',
    title: '詳細なエラー情報',
    message: 'これは非常に長いエラーメッセージの例です。複数行にわたってメッセージが表示され、ユーザーに詳細な情報を提供します。計算機の使用方法や入力値の制限について説明することができます。',
  },
};