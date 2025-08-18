import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './header';

interface HeaderProps {
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const meta: Meta<HeaderProps> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    bgColor: {
      control: { type: 'select' },
      options: ['!bg-blue-600', '!bg-gray-800', '!bg-green-600', '!bg-red-600', '!bg-purple-600'],
      description: 'ヘッダーの背景色',
    },
    textColor: {
      control: { type: 'select' },
      options: ['!text-white', '!text-gray-900', '!text-gray-100'],
      description: 'ヘッダーの文字色',
    },
  },
};

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {};

export const DarkTheme: Story = {
  args: {
    bgColor: '!bg-gray-800',
    textColor: '!text-white',
  },
};

export const GreenTheme: Story = {
  args: {
    bgColor: '!bg-green-600',
    textColor: '!text-white',
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};