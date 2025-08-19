import type { Meta, StoryObj } from '@storybook/react';
import { ErrorBoundary } from './error-boundary';
import React from 'react';

// エラーを発生させるテスト用コンポーネント
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('テスト用のエラーが発生しました');
  }
  return React.createElement('div', null, '正常なコンポーネント');
};

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Common/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'React Error Boundaryコンポーネント。予期しないエラーをキャッチし、フォールバックUIを表示します。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: React.createElement(ThrowError, { shouldThrow: false }),
  },
};

export const WithError: Story = {
  args: {
    children: React.createElement(ThrowError, { shouldThrow: true }),
  },
};

export const WithCustomFallback: Story = {
  args: {
    children: React.createElement(ThrowError, { shouldThrow: true }),
    fallback: React.createElement('div', { 
      className: 'p-4 bg-red-100 border border-red-300 rounded-md text-red-800' 
    }, 'カスタムエラーメッセージ'),
  },
};