import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'destructiveOutline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
    },
    asChild: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '計算する',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: '計算を開始',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: '削除する',
  },
};

export const DestructiveOutline: Story = {
  args: {
    variant: 'destructiveOutline',
    children: 'キャンセル',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'セカンダリ',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: '小さいボタン',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: '大きいボタン',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: '無効化ボタン',
  },
};