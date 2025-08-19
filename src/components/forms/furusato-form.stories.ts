import type { Meta, StoryObj } from '@storybook/react';
import { FurusatoForm } from './furusato-form';
import React from 'react';

const meta: Meta<typeof FurusatoForm> = {
  title: 'Forms/FurusatoForm',
  component: FurusatoForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ふるさと納税の控除上限額を計算するためのフォームコンポーネント。年収、家族構成、各種控除額を入力できます。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onCalculate: {
      action: 'calculate',
      description: '計算実行時のコールバック関数',
    },
    isCalculating: {
      control: { type: 'boolean' },
      description: '計算中かどうか',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCalculate: (data) => {
      console.log('Calculation data:', data);
    },
    isCalculating: false,
  },
};

export const Calculating: Story = {
  args: {
    onCalculate: (data) => {
      console.log('Calculation data:', data);
    },
    isCalculating: true,
  },
};

export const WithPrefilledData: Story = {
  render: (args) => {
    // フォームに初期値が設定された状態をシミュレート
    const formRef = React.useRef<HTMLFormElement>(null);
    
    React.useEffect(() => {
      if (formRef.current) {
        const form = formRef.current;
        const annualIncomeInput = form.querySelector('input[name="annualIncome"]') as HTMLInputElement;
        const incomeTypeSelect = form.querySelector('select[name="incomeType"]') as HTMLSelectElement;
        const familyTypeRadio = form.querySelector('input[name="familyType"][value="married_no_income"]') as HTMLInputElement;
        
        if (annualIncomeInput) annualIncomeInput.value = '5000000';
        if (incomeTypeSelect) incomeTypeSelect.value = 'salary';
        if (familyTypeRadio) familyTypeRadio.checked = true;
      }
    }, []);

    return React.createElement('div', { ref: formRef }, [
      React.createElement(FurusatoForm, {
        key: 'form',
        ...args,
      })
    ]);
  },
  args: {
    onCalculate: (data) => {
      console.log('Calculation data:', data);
    },
    isCalculating: false,
  },
};

export const FullFormExample: Story = {
  render: (args) => React.createElement('div', { className: 'w-full max-w-2xl' }, [
    React.createElement('div', { key: 'header', className: 'mb-6 text-center' }, [
      React.createElement('h2', { key: 'title', className: 'text-2xl font-bold mb-2' }, 'ふるさと納税シミュレーション'),
      React.createElement('p', { key: 'description', className: 'text-muted-foreground' }, '年収や家族構成から控除上限額を計算します'),
    ]),
    React.createElement(FurusatoForm, {
      key: 'form',
      ...args,
    })
  ]),
  args: {
    onCalculate: (data) => {
      console.log('Calculation data:', data);
    },
    isCalculating: false,
  },
};