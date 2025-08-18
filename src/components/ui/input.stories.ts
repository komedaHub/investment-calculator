import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'テキストを入力してください',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '1000000',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'example@example.com',
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'パスワードを入力',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '無効化された入力',
    value: 'サンプルテキスト',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'エラー状態の入力',
    className: 'border-red-500',
  },
};

export const Large: Story = {
  args: {
    placeholder: '大きな入力フィールド',
    className: 'h-12 text-lg',
  },
};