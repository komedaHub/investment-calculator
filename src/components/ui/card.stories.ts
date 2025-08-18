import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => React.createElement(Card, { className: 'w-80' },
    React.createElement(CardHeader, {},
      React.createElement(CardTitle, {}, '複利計算機'),
      React.createElement(CardDescription, {}, '複利の力を活用した投資シミュレーション')
    ),
    React.createElement(CardContent, {},
      React.createElement('p', {}, '元本と月額積立で将来価値を計算します。')
    ),
    React.createElement(CardFooter, {},
      React.createElement(Button, { className: 'w-full' }, '計算を開始')
    )
  ),
};

export const WithForm: Story = {
  render: () => React.createElement(Card, { className: 'w-96' },
    React.createElement(CardHeader, {},
      React.createElement(CardTitle, {}, '複利計算設定')
    ),
    React.createElement(CardContent, { className: 'space-y-4' },
      React.createElement('div', { className: 'space-y-2' },
        React.createElement('label', { className: 'text-sm font-medium' }, '初期投資額（円）'),
        React.createElement('input', { 
          type: 'number', 
          className: 'w-full p-2 border rounded-md',
          defaultValue: '1000000'
        })
      ),
      React.createElement('div', { className: 'space-y-2' },
        React.createElement('label', { className: 'text-sm font-medium' }, '年利率（%）'),
        React.createElement('input', { 
          type: 'number', 
          className: 'w-full p-2 border rounded-md',
          defaultValue: '5'
        })
      )
    ),
    React.createElement(CardFooter, {},
      React.createElement(Button, { className: 'w-full' }, '計算する')
    )
  ),
};

export const ResultCard: Story = {
  render: () => React.createElement(Card, { className: 'w-80' },
    React.createElement(CardHeader, {},
      React.createElement(CardTitle, {}, '計算結果')
    ),
    React.createElement(CardContent, { className: 'space-y-4' },
      React.createElement('div', { className: 'flex justify-between items-center p-3 bg-muted rounded-lg' },
        React.createElement('span', { className: 'font-medium' }, '最終運用額'),
        React.createElement('span', { className: 'text-xl font-bold text-green-600' }, '¥2,653,298')
      ),
      React.createElement('div', { className: 'flex justify-between items-center p-3 bg-muted rounded-lg' },
        React.createElement('span', { className: 'font-medium' }, '投資元本'),
        React.createElement('span', { className: 'text-lg' }, '¥2,200,000')
      ),
      React.createElement('div', { className: 'flex justify-between items-center p-3 bg-muted rounded-lg' },
        React.createElement('span', { className: 'font-medium' }, '運用益'),
        React.createElement('span', { className: 'text-lg text-green-600' }, '¥453,298')
      )
    )
  ),
};