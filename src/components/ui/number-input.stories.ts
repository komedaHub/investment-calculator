import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './number-input';
import { useState } from 'react';
import React from 'react';

// Controlled component wrapper for Storybook
const NumberInputWrapper = (props: any) => {
  const [value, setValue] = useState<number>(props.value || 0);
  
  return React.createElement(NumberInput, {
    ...props,
    value,
    onChange: setValue,
  });
};

const meta: Meta<typeof NumberInput> = {
  title: 'UI/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '数値入力専用のコンポーネント。フォーマット機能、バリデーション、単位表示をサポートします。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: '現在の値',
    },
    min: {
      control: { type: 'number' },
      description: '最小値',
    },
    max: {
      control: { type: 'number' },
      description: '最大値',
    },
    step: {
      control: { type: 'number' },
      description: '増減ステップ',
    },
    decimals: {
      control: { type: 'number' },
      description: '小数点以下の桁数',
    },
    allowNegative: {
      control: { type: 'boolean' },
      description: '負数を許可するか',
    },
    formatDisplay: {
      control: { type: 'boolean' },
      description: '表示時にカンマ区切りでフォーマットするか',
    },
    unit: {
      control: { type: 'text' },
      description: '単位',
    },
    unitPosition: {
      control: { type: 'select' },
      options: ['prefix', 'suffix'],
      description: '単位の位置',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => React.createElement(NumberInputWrapper, args),
  args: {
    placeholder: '数値を入力',
    value: 1000000,
  },
};

export const WithCurrency: Story = {
  render: (args) => React.createElement(NumberInputWrapper, args),
  args: {
    placeholder: '金額を入力',
    value: 5000000,
    formatDisplay: true,
    unit: '円',
    unitPosition: 'suffix',
  },
};

export const WithPercent: Story = {
  render: (args) => React.createElement(NumberInputWrapper, args),
  args: {
    placeholder: '利率を入力',
    value: 5.5,
    decimals: 2,
    min: 0,
    max: 100,
    step: 0.1,
    unit: '%',
    unitPosition: 'suffix',
  },
};

export const WithMinMax: Story = {
  render: (args) => React.createElement(NumberInputWrapper, args),
  args: {
    placeholder: '1-10の値を入力',
    value: 5,
    min: 1,
    max: 10,
    step: 1,
  },
};

export const AllowNegative: Story = {
  render: (args) => React.createElement(NumberInputWrapper, args),
  args: {
    placeholder: '正負の値を入力',
    value: -100,
    allowNegative: true,
    formatDisplay: true,
  },
};

export const WithDecimals: Story = {
  render: (args) => React.createElement(NumberInputWrapper, args),
  args: {
    placeholder: '小数点を入力',
    value: 123.45,
    decimals: 2,
    step: 0.01,
  },
};

export const Large: Story = {
  render: (args) => React.createElement(NumberInputWrapper, args),
  args: {
    placeholder: '大きな数値を入力',
    value: 1000000000,
    formatDisplay: true,
    unit: '円',
    unitPosition: 'suffix',
  },
};