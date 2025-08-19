import type { Meta, StoryObj } from '@storybook/react';
import { FormSection } from './form-section';
import { Input } from './input';
import { Label } from './label';
import { Home, User, Settings } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof FormSection> = {
  title: 'UI/FormSection',
  component: FormSection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'フォームをセクション分けするためのコンポーネント。タイトル、説明、アイコン、折りたたみ機能をサポートします。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'card', 'bordered'],
      description: '表示スタイル',
    },
    collapsible: {
      control: { type: 'boolean' },
      description: '折りたたみ可能にするか',
    },
    defaultCollapsed: {
      control: { type: 'boolean' },
      description: 'デフォルトで折りたたまれているか',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleForm = () => React.createElement('div', { className: 'space-y-4' }, [
  React.createElement('div', { key: 'field1' }, [
    React.createElement(Label, { key: 'label1', htmlFor: 'name' }, 'お名前'),
    React.createElement(Input, { key: 'input1', id: 'name', placeholder: '田中太郎' }),
  ]),
  React.createElement('div', { key: 'field2' }, [
    React.createElement(Label, { key: 'label2', htmlFor: 'email' }, 'メールアドレス'),
    React.createElement(Input, { key: 'input2', id: 'email', type: 'email', placeholder: 'example@email.com' }),
  ]),
]);

export const Default: Story = {
  args: {
    title: '基本情報',
    description: '必要な基本情報を入力してください',
    children: React.createElement(SampleForm),
  },
};

export const WithIcon: Story = {
  args: {
    title: '個人情報',
    description: 'あなたの個人情報を入力してください',
    icon: React.createElement(User, { className: 'h-4 w-4' }),
    children: React.createElement(SampleForm),
  },
};

export const CardVariant: Story = {
  args: {
    title: '設定',
    description: 'アプリケーションの設定を変更できます',
    icon: React.createElement(Settings, { className: 'h-5 w-5' }),
    variant: 'card',
    children: React.createElement(SampleForm),
  },
};

export const BorderedVariant: Story = {
  args: {
    title: '住所情報',
    description: '配送先の住所を入力してください',
    icon: React.createElement(Home, { className: 'h-4 w-4' }),
    variant: 'bordered',
    children: React.createElement(SampleForm),
  },
};

export const Collapsible: Story = {
  args: {
    title: '詳細設定',
    description: 'オプションの詳細設定です（クリックして展開）',
    icon: React.createElement(Settings, { className: 'h-4 w-4' }),
    variant: 'card',
    collapsible: true,
    children: React.createElement(SampleForm),
  },
};

export const CollapsedByDefault: Story = {
  args: {
    title: '高度な設定',
    description: '上級者向けの設定項目です',
    icon: React.createElement(Settings, { className: 'h-4 w-4' }),
    variant: 'bordered',
    collapsible: true,
    defaultCollapsed: true,
    children: React.createElement(SampleForm),
  },
};

export const WithoutTitle: Story = {
  args: {
    description: 'タイトルなしのセクションです',
    children: React.createElement(SampleForm),
  },
};

export const MinimalDefault: Story = {
  args: {
    children: React.createElement(SampleForm),
  },
};

export const MultipleSection: Story = {
  render: () => React.createElement('div', { className: 'space-y-6 w-96' }, [
    React.createElement(FormSection, {
      key: 'section1',
      title: '基本情報',
      description: '必要な基本情報を入力',
      icon: React.createElement(User, { className: 'h-4 w-4' }),
      variant: 'card',
      children: React.createElement(SampleForm),
    }),
    React.createElement(FormSection, {
      key: 'section2',
      title: '詳細設定',
      description: 'オプション設定（任意）',
      icon: React.createElement(Settings, { className: 'h-4 w-4' }),
      variant: 'bordered',
      collapsible: true,
      defaultCollapsed: true,
      children: React.createElement(SampleForm),
    }),
  ]),
};