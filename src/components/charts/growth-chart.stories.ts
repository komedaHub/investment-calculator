import type { Meta, StoryObj } from '@storybook/nextjs';
import { GrowthChart } from './growth-chart';

const meta: Meta<typeof GrowthChart> = {
  title: 'Charts/GrowthChart',
  component: GrowthChart,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 固定データ - 投資チャート用
export const Default: Story = {
  args: {
    data: [
      { year: 1, investment: 1600000, interest: 80000, total: 1680000 },
      { year: 2, investment: 2280000, interest: 194000, total: 2474000 },
      { year: 3, investment: 2960000, interest: 348200, total: 3308200 },
      { year: 4, investment: 3640000, interest: 547070, total: 4187070 },
      { year: 5, investment: 4320000, interest: 795423, total: 5115423 },
    ],
    config: {
      xAxisKey: 'year',
      xAxisLabel: '年',
      tooltipLabelFormatter: (label: string | number) => `${label}年目`,
      height: 400,
      margin: { top: 20, right: 30, left: 80, bottom: 80 },
      areas: [
        {
          dataKey: 'investment',
          name: '投資元本',
          color: '#16a34a',
          stackId: '1',
          fillOpacity: 0.6,
        },
        {
          dataKey: 'interest',
          name: '運用益',
          color: '#22c55e',
          stackId: '1',
          fillOpacity: 0.8,
        },
      ],
    },
    title: '資産推移チャート',
  },
};

// 固定データ - 長期投資用
export const LongTerm: Story = {
  args: {
    data: [
      { year: 1, investment: 1600000, interest: 80000, total: 1680000 },
      { year: 5, investment: 4320000, interest: 795423, total: 5115423 },
      { year: 10, investment: 7720000, interest: 2954922, total: 10674922 },
      { year: 15, investment: 11120000, interest: 6387438, total: 17507438 },
      { year: 20, investment: 14520000, interest: 12548891, total: 27068891 },
    ],
    config: {
      xAxisKey: 'year',
      xAxisLabel: '年',
      tooltipLabelFormatter: (label: string | number) => `${label}年目`,
      height: 400,
      margin: { top: 20, right: 30, left: 80, bottom: 80 },
      areas: [
        {
          dataKey: 'investment',
          name: '投資元本',
          color: '#16a34a',
          stackId: '1',
          fillOpacity: 0.6,
        },
        {
          dataKey: 'interest',
          name: '運用益',
          color: '#22c55e',
          stackId: '1',
          fillOpacity: 0.8,
        },
      ],
    },
    title: '長期投資シミュレーション',
  },
};

// 固定データ - 売上チャート用
export const SalesChart: Story = {
  args: {
    data: [
      { month: 1, online: 120000, store: 80000, total: 200000 },
      { month: 2, online: 140000, store: 75000, total: 215000 },
      { month: 3, online: 160000, store: 90000, total: 250000 },
      { month: 4, online: 180000, store: 85000, total: 265000 },
      { month: 5, online: 200000, store: 95000, total: 295000 },
      { month: 6, online: 220000, store: 100000, total: 320000 },
    ],
    config: {
      xAxisKey: 'month',
      xAxisLabel: '月',
      tooltipLabelFormatter: (label: string | number) => `${label}月目`,
      height: 400,
      margin: { top: 20, right: 30, left: 80, bottom: 80 },
      areas: [
        {
          dataKey: 'online',
          name: 'オンライン売上',
          color: '#3b82f6',
          stackId: '1',
          fillOpacity: 0.7,
        },
        {
          dataKey: 'store',
          name: '店舗売上',
          color: '#ef4444',
          stackId: '1',
          fillOpacity: 0.7,
        },
      ],
    },
    title: '月次売上推移',
  },
};

// シンプルなテストケース
export const SimpleTest: Story = {
  args: {
    data: [
      { x: 1, y: 100 },
      { x: 2, y: 200 },
      { x: 3, y: 300 },
    ],
    config: {
      xAxisKey: 'x',
      height: 300,
      margin: { top: 20, right: 30, left: 50, bottom: 60 },
      areas: [
        {
          dataKey: 'y',
          name: 'テストデータ',
          color: '#8884d8',
          fillOpacity: 0.6,
        },
      ],
    },
    title: 'シンプルテスト',
  },
};