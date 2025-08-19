import type { Meta, StoryObj } from '@storybook/react';
import { Loading, LoadingOverlay } from './loading';
import React from 'react';

const meta: Meta<typeof Loading> = {
  title: 'Common/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ローディング表示コンポーネント。処理中の状態を視覚的に表示します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'ローディングスピナーのサイズ',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    message: '読み込み中...',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    message: '計算中...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    message: 'データを処理中...',
  },
};

export const WithoutMessage: Story = {
  args: {
    size: 'md',
  },
};

// LoadingOverlay用のストーリー
const OverlayMeta: Meta<typeof LoadingOverlay> = {
  title: 'Common/LoadingOverlay',
  component: LoadingOverlay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ローディングオーバーレイコンポーネント。既存のコンテンツの上にローディング表示を重ねます。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isLoading: {
      control: { type: 'boolean' },
      description: 'ローディング状態かどうか',
    },
  },
};

export const OverlayDefault: StoryObj<typeof LoadingOverlay> = {
  ...OverlayMeta,
  args: {
    isLoading: false,
    message: '計算中...',
    children: React.createElement('div', {
      className: 'p-8 bg-gray-100 rounded-md min-h-[200px] flex items-center justify-center'
    }, 'コンテンツエリア'),
  },
};

export const OverlayLoading: StoryObj<typeof LoadingOverlay> = {
  ...OverlayMeta,
  args: {
    isLoading: true,
    message: '計算中...',
    children: React.createElement('div', {
      className: 'p-8 bg-gray-100 rounded-md min-h-[200px] flex items-center justify-center'
    }, 'コンテンツエリア'),
  },
};

export const OverlayCard: StoryObj<typeof LoadingOverlay> = {
  ...OverlayMeta,
  args: {
    isLoading: true,
    message: 'フォームを送信中...',
    children: React.createElement('div', {
      className: 'p-6 border rounded-lg shadow-sm bg-white min-h-[300px]'
    }, [
      React.createElement('h3', { 
        key: 'title',
        className: 'text-lg font-semibold mb-4' 
      }, '投資計算フォーム'),
      React.createElement('div', { 
        key: 'content',
        className: 'space-y-4' 
      }, [
        React.createElement('div', { key: 'field1' }, '元本: 1,000,000円'),
        React.createElement('div', { key: 'field2' }, '年利率: 5%'),
        React.createElement('div', { key: 'field3' }, '投資期間: 10年'),
      ]),
    ]),
  },
};