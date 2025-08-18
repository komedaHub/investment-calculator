import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

// Create a simplified version for Storybook that shows static data
const SimpleDataTable = ({ data }: { data?: Array<{ year: number; investment: number; gains: number; total: number }> }) => {
  const defaultData = data || [
    { year: 1, investment: 1600000, gains: 80000, total: 1680000 },
    { year: 2, investment: 2280000, gains: 194000, total: 2474000 },
    { year: 3, investment: 2960000, gains: 348200, total: 3308200 },
    { year: 4, investment: 3640000, gains: 547070, total: 4187070 },
    { year: 5, investment: 4320000, gains: 795423, total: 5115423 },
  ];

  return React.createElement(Card, { className: 'w-full' }, [
    React.createElement(CardHeader, { key: 'header' }, 
      React.createElement(CardTitle, null, '年次資産推移表')
    ),
    React.createElement(CardContent, { key: 'content' }, 
      React.createElement('div', { className: 'overflow-x-auto' },
        React.createElement('table', { className: 'w-full border-collapse' }, [
          React.createElement('thead', { key: 'thead' },
            React.createElement('tr', { className: 'border-b' }, [
              React.createElement('th', { key: 'year', className: 'text-left p-2 font-medium' }, '年'),
              React.createElement('th', { key: 'investment', className: 'text-right p-2 font-medium' }, '投資累計'),
              React.createElement('th', { key: 'gains', className: 'text-right p-2 font-medium' }, '運用益'),
              React.createElement('th', { key: 'total', className: 'text-right p-2 font-medium' }, '総資産')
            ])
          ),
          React.createElement('tbody', { key: 'tbody' },
            defaultData.map((row, index) =>
              React.createElement('tr', { key: index, className: 'border-b' }, [
                React.createElement('td', { key: 'year', className: 'p-2' }, row.year),
                React.createElement('td', { key: 'investment', className: 'p-2 text-right' }, 
                  `¥${row.investment.toLocaleString()}`
                ),
                React.createElement('td', { key: 'gains', className: 'p-2 text-right text-green-600' }, 
                  `¥${row.gains.toLocaleString()}`
                ),
                React.createElement('td', { key: 'total', className: 'p-2 text-right font-medium' }, 
                  `¥${row.total.toLocaleString()}`
                )
              ])
            )
          )
        ])
      )
    )
  ]);
};

const meta: Meta<typeof SimpleDataTable> = {
  title: 'Charts/DataTable (Simple)',
  component: SimpleDataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of yearly data to display in the table',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LargerDataset: Story = {
  args: {
    data: [
      { year: 1, investment: 1600000, gains: 80000, total: 1680000 },
      { year: 2, investment: 2280000, gains: 194000, total: 2474000 },
      { year: 3, investment: 2960000, gains: 348200, total: 3308200 },
      { year: 4, investment: 3640000, gains: 547070, total: 4187070 },
      { year: 5, investment: 4320000, gains: 795423, total: 5115423 },
      { year: 6, investment: 5000000, gains: 1097894, total: 6097894 },
      { year: 7, investment: 5680000, gains: 1459488, total: 7139488 },
      { year: 8, investment: 6360000, gains: 1885462, total: 8245462 },
      { year: 9, investment: 7040000, gains: 2381735, total: 9421735 },
      { year: 10, investment: 7720000, gains: 2954922, total: 10674922 },
    ]
  },
};

export const SmallDataset: Story = {
  args: {
    data: [
      { year: 1, investment: 600000, gains: 30000, total: 630000 },
      { year: 2, investment: 1200000, gains: 93000, total: 1293000 },
      { year: 3, investment: 1800000, gains: 184650, total: 1984650 },
    ]
  },
};