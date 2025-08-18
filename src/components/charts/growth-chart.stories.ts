import type { Meta, StoryObj } from '@storybook/react';
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

// サンプルデータ生成
const generateSampleData = (years: number, growth: number = 1.05) => {
  const data = [];
  let investment = 1000000; // 初期投資
  let total = investment;
  
  for (let year = 1; year <= years; year++) {
    total = total * growth + 600000; // 年間50万円積立
    investment += 600000;
    const interest = total - investment;
    
    data.push({
      year,
      investment: Math.round(investment),
      interest: Math.round(interest),
      total: Math.round(total),
    });
  }
  
  return data;
};

export const Default: Story = {
  args: {
    data: generateSampleData(10),
  },
};

export const LongTerm: Story = {
  args: {
    data: generateSampleData(30),
  },
};

export const HighGrowth: Story = {
  args: {
    data: generateSampleData(15, 1.08), // 8%成長
  },
};

export const LowGrowth: Story = {
  args: {
    data: generateSampleData(20, 1.02), // 2%成長
  },
};

export const ShortTerm: Story = {
  args: {
    data: generateSampleData(5),
  },
};

export const NoGrowth: Story = {
  args: {
    data: generateSampleData(10, 1.0), // 0%成長（積立のみ）
  },
};