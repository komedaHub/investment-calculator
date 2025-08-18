import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InvestmentIcon } from './investment-icon';

const meta: Meta<typeof InvestmentIcon> = {
  title: 'UI/InvestmentIcon',
  component: InvestmentIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 128, step: 8 },
      description: 'アイコンのサイズ',
    },
    className: {
      control: { type: 'text' },
      description: 'カスタムCSSクラス',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 32,
  },
};

export const Small: Story = {
  args: {
    size: 16,
  },
};

export const Medium: Story = {
  args: {
    size: 24,
  },
};

export const Large: Story = {
  args: {
    size: 48,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 64,
  },
};

export const WithCustomClass: Story = {
  args: {
    size: 32,
    className: 'opacity-75 hover:opacity-100 transition-opacity',
  },
};

export const AllSizes: Story = {
  render: () => {
    const React = require('react');
    const sizes = [16, 24, 32, 48, 64];
    return React.createElement('div', { className: 'flex items-center gap-4' }, 
      sizes.map(size => 
        React.createElement('div', { 
          key: size,
          className: 'flex flex-col items-center gap-2'
        }, [
          React.createElement(InvestmentIcon, { key: 'icon', size }),
          React.createElement('span', { 
            key: 'label',
            className: 'text-xs text-gray-600'
          }, `${size}px`)
        ])
      )
    );
  },
};