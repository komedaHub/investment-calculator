import type { Meta, StoryObj } from '@storybook/react';
import { FurusatoCalculator } from './furusato-calculator';
import React from 'react';

const meta: Meta<typeof FurusatoCalculator> = {
  title: 'Calculators/FurusatoCalculator',
  component: FurusatoCalculator,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'ふるさと納税の控除上限額を計算するメインコンポーネント。フォーム入力と計算結果表示を含みます。',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithContainer: Story = {
  render: () => React.createElement('div', { className: 'min-h-screen bg-background' }, [
    React.createElement(FurusatoCalculator, { key: 'calculator' })
  ]),
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => React.createElement('div', { className: 'min-h-screen bg-background' }, [
    React.createElement(FurusatoCalculator, { key: 'calculator' })
  ]),
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => React.createElement('div', { className: 'min-h-screen bg-background' }, [
    React.createElement(FurusatoCalculator, { key: 'calculator' })
  ]),
};