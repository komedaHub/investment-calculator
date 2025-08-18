import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'blue', 'red'],
      description: 'スイッチの色バリアント',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'スイッチの状態',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'スイッチの無効状態',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: false,
    variant: 'blue',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    variant: 'blue',
  },
};

export const Blue: Story = {
  args: {
    checked: true,
    variant: 'blue',
  },
};

export const Red: Story = {
  args: {
    checked: true,
    variant: 'red',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    variant: 'blue',
  },
};

export const DisabledChecked: Story = {
  args: {
    checked: true,
    disabled: true,
    variant: 'blue',
  },
};

export const RedUnchecked: Story = {
  args: {
    checked: false,
    variant: 'red',
  },
};

export const AllVariants: Story = {
  render: () => {
    const React = require('react');
    return React.createElement('div', { className: 'space-y-4' }, [
      React.createElement('div', { key: '1', className: 'flex items-center space-x-4' }, [
        React.createElement(Switch, { key: 'switch1', variant: 'blue', checked: false }),
        React.createElement('span', { key: 'label1' }, 'Blue (Unchecked)')
      ]),
      React.createElement('div', { key: '2', className: 'flex items-center space-x-4' }, [
        React.createElement(Switch, { key: 'switch2', variant: 'blue', checked: true }),
        React.createElement('span', { key: 'label2' }, 'Blue (Checked)')
      ]),
      React.createElement('div', { key: '3', className: 'flex items-center space-x-4' }, [
        React.createElement(Switch, { key: 'switch3', variant: 'red', checked: false }),
        React.createElement('span', { key: 'label3' }, 'Red (Unchecked)')
      ]),
      React.createElement('div', { key: '4', className: 'flex items-center space-x-4' }, [
        React.createElement(Switch, { key: 'switch4', variant: 'red', checked: true }),
        React.createElement('span', { key: 'label4' }, 'Red (Checked)')
      ]),
      React.createElement('div', { key: '5', className: 'flex items-center space-x-4' }, [
        React.createElement(Switch, { key: 'switch5', variant: 'blue', checked: false, disabled: true }),
        React.createElement('span', { key: 'label5' }, 'Blue (Disabled)')
      ]),
      React.createElement('div', { key: '6', className: 'flex items-center space-x-4' }, [
        React.createElement(Switch, { key: 'switch6', variant: 'red', checked: true, disabled: true }),
        React.createElement('span', { key: 'label6' }, 'Red (Disabled, Checked)')
      ])
    ]);
  },
};