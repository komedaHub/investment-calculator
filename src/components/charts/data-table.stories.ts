import type { Meta, StoryObj } from '@storybook/nextjs';
import { DataTable } from './data-table';
import React from 'react';

const meta: Meta<typeof DataTable> = {
  title: 'Charts/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'テーブルのタイトル',
    },
    config: {
      description: 'テーブルの設定オブジェクト',
    },
    data: {
      description: 'テーブルに表示するデータ配列',
    },
    className: {
      control: { type: 'text' },
      description: 'カスタムCSSクラス',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number) => {
  return new Intl.NumberFormat('ja-JP', {
    maximumFractionDigits: 2,
  }).format(value);
};

const investmentData = [
  { year: 1, investment: 1600000, interest: 80000, total: 1680000 },
  { year: 2, investment: 2280000, interest: 194000, total: 2474000 },
  { year: 3, investment: 2960000, interest: 348200, total: 3308200 },
  { year: 4, investment: 3640000, interest: 547070, total: 4187070 },
  { year: 5, investment: 4320000, interest: 795423, total: 5115423 },
];

const investmentTableConfig = {
  columns: [
    {
      key: 'year',
      header: '年数',
      render: (value: number) => `${value}年目`,
    },
    {
      key: 'investment',
      header: '投資元本',
      align: 'right' as const,
      render: (value: number) => formatCurrency(value),
    },
    {
      key: 'interest',
      header: '運用益',
      align: 'right' as const,
      render: (value: number) => 
        React.createElement('span', {
          className: value >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'
        }, formatCurrency(value)),
    },
    {
      key: 'total',
      header: '合計金額',
      align: 'right' as const,
      render: (value: number) => 
        React.createElement('span', {
          className: value >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'
        }, formatCurrency(value)),
    },
    {
      key: 'profitRate',
      header: '利益率',
      align: 'right' as const,
      render: (value: unknown, row: Record<string, unknown>) => {
        const profitRate = (row.investment as number) > 0 ? ((row.interest as number) / (row.investment as number)) * 100 : 0;
        return React.createElement('span', {
          className: profitRate > 0 ? 'text-green-600' : profitRate < 0 ? 'text-red-600' : 'text-gray-500'
        }, `${formatNumber(profitRate)}%`);
      },
    },
  ],
  showSummary: true,
  summary: [
    {
      label: '最終投資元本',
      value: formatCurrency(investmentData[investmentData.length - 1]?.investment || 0),
    },
    {
      label: '最終運用益',
      value: React.createElement('span', {
        className: (investmentData[investmentData.length - 1]?.interest || 0) >= 0 ? 'text-green-600' : 'text-red-600'
      }, formatCurrency(investmentData[investmentData.length - 1]?.interest || 0)),
    },
    {
      label: '最終合計金額',
      value: React.createElement('span', {
        className: (investmentData[investmentData.length - 1]?.total || 0) >= 0 ? 'text-green-600' : 'text-red-600'
      }, formatCurrency(investmentData[investmentData.length - 1]?.total || 0)),
    },
    {
      label: '最終利益率',
      value: formatNumber(
        investmentData[investmentData.length - 1]?.investment > 0 
          ? ((investmentData[investmentData.length - 1]?.interest || 0) / (investmentData[investmentData.length - 1]?.investment || 1)) * 100
          : 0
      ) + '%',
    },
  ],
  striped: true,
  hoverable: true,
};

export const Default: Story = {
  args: {
    data: investmentData,
    config: investmentTableConfig,
    title: '年次データ詳細',
  },
};

export const WithoutSummary: Story = {
  args: {
    data: investmentData,
    config: {
      ...investmentTableConfig,
      showSummary: false,
    },
    title: 'サマリーなしテーブル',
  },
};

export const SimpleTable: Story = {
  args: {
    data: [
      { name: '田中太郎', age: 28, department: '営業部', salary: 4500000 },
      { name: '佐藤花子', age: 32, department: '開発部', salary: 5200000 },
      { name: '鈴木一郎', age: 45, department: '管理部', salary: 6800000 },
      { name: '高橋美咲', age: 29, department: '営業部', salary: 4800000 },
    ],
    config: {
      columns: [
        { key: 'name', header: '氏名' },
        { key: 'age', header: '年齢', align: 'center' as const },
        { key: 'department', header: '部署' },
        { 
          key: 'salary', 
          header: '年収', 
          align: 'right' as const,
          render: (value: number) => formatCurrency(value),
        },
      ],
      striped: false,
      hoverable: true,
    },
    title: '社員一覧',
  },
};

export const SalesTable: Story = {
  args: {
    data: [
      { product: 'iPhone 15', jan: 150, feb: 180, mar: 200, total: 530 },
      { product: 'iPad Pro', jan: 80, feb: 90, mar: 110, total: 280 },
      { product: 'MacBook Air', jan: 45, feb: 50, mar: 55, total: 150 },
      { product: 'Apple Watch', jan: 120, feb: 140, mar: 160, total: 420 },
    ],
    config: {
      columns: [
        { key: 'product', header: '商品名' },
        { key: 'jan', header: '1月', align: 'right' as const },
        { key: 'feb', header: '2月', align: 'right' as const },
        { key: 'mar', header: '3月', align: 'right' as const },
        { 
          key: 'total', 
          header: '合計', 
          align: 'right' as const,
          className: 'font-semibold',
        },
      ],
      showSummary: true,
      summary: [
        { label: '総売上台数', value: '1,380台' },
        { label: '平均月次売上', value: '345台' },
      ],
      striped: true,
      hoverable: true,
    },
    title: '四半期売上実績',
  },
};