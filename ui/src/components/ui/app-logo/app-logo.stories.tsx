import type { Meta, StoryObj } from '@storybook/react';
import { AppLogo } from './index';

const meta: Meta<typeof AppLogo> = {
  title: 'UI/AppLogo',
  component: AppLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
