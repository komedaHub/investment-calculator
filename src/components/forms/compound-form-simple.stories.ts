import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

// Create a simplified version for Storybook that doesn't use React Hook Form
const SimpleCompoundForm = () => {
  return React.createElement(Card, { className: 'w-full max-w-md mx-auto' }, [
    React.createElement(CardHeader, { key: 'header' }, 
      React.createElement(CardTitle, null, '複利計算機')
    ),
    React.createElement(CardContent, { key: 'content', className: 'space-y-4' }, [
      React.createElement('div', { key: 'principal', className: 'space-y-2' }, [
        React.createElement('label', { key: 'label', className: 'text-sm font-medium' }, '初期投資額（円）'),
        React.createElement(Input, { 
          key: 'input',
          type: 'number',
          placeholder: '1000000',
          defaultValue: '1000000'
        })
      ]),
      React.createElement('div', { key: 'rate', className: 'space-y-2' }, [
        React.createElement('label', { key: 'label', className: 'text-sm font-medium' }, '年利率（%）'),
        React.createElement(Input, { 
          key: 'input',
          type: 'number',
          placeholder: '5',
          defaultValue: '5'
        })
      ]),
      React.createElement('div', { key: 'years', className: 'space-y-2' }, [
        React.createElement('label', { key: 'label', className: 'text-sm font-medium' }, '投資期間（年）'),
        React.createElement(Input, { 
          key: 'input',
          type: 'number',
          placeholder: '10',
          defaultValue: '10'
        })
      ]),
      React.createElement('div', { key: 'monthly', className: 'space-y-2' }, [
        React.createElement('label', { key: 'label', className: 'text-sm font-medium' }, '月次積立額（円）'),
        React.createElement(Input, { 
          key: 'input',
          type: 'number',
          placeholder: '50000',
          defaultValue: '50000'
        })
      ]),
      React.createElement(Button, { 
        key: 'button',
        type: 'submit',
        className: 'w-full'
      }, '計算する')
    ])
  ]);
};

const meta: Meta<typeof SimpleCompoundForm> = {
  title: 'Forms/CompoundForm (Simple)',
  component: SimpleCompoundForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDifferentValues: Story = {
  render: () => {
    return React.createElement(Card, { className: 'w-full max-w-md mx-auto' }, [
      React.createElement(CardHeader, { key: 'header' }, 
        React.createElement(CardTitle, null, '複利計算機')
      ),
      React.createElement(CardContent, { key: 'content', className: 'space-y-4' }, [
        React.createElement('div', { key: 'principal', className: 'space-y-2' }, [
          React.createElement('label', { key: 'label', className: 'text-sm font-medium' }, '初期投資額（円）'),
          React.createElement(Input, { 
            key: 'input',
            type: 'number',
            placeholder: '5000000',
            defaultValue: '5000000'
          })
        ]),
        React.createElement('div', { key: 'rate', className: 'space-y-2' }, [
          React.createElement('label', { key: 'label', className: 'text-sm font-medium' }, '年利率（%）'),
          React.createElement(Input, { 
            key: 'input',
            type: 'number',
            placeholder: '7',
            defaultValue: '7'
          })
        ]),
        React.createElement('div', { key: 'years', className: 'space-y-2' }, [
          React.createElement('label', { key: 'label', className: 'text-sm font-medium' }, '投資期間（年）'),
          React.createElement(Input, { 
            key: 'input',
            type: 'number',
            placeholder: '20',
            defaultValue: '20'
          })
        ]),
        React.createElement('div', { key: 'monthly', className: 'space-y-2' }, [
          React.createElement('label', { key: 'label', className: 'text-sm font-medium' }, '月次積立額（円）'),
          React.createElement(Input, { 
            key: 'input',
            type: 'number',
            placeholder: '100000',
            defaultValue: '100000'
          })
        ]),
        React.createElement(Button, { 
          key: 'button',
          type: 'submit',
          className: 'w-full'
        }, '計算する')
      ])
    ]);
  }
};