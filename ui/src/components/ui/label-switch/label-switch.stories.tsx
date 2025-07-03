import type { Meta, StoryObj } from '@storybook/react';
import LabelSwitch from './label-switch';

const meta: Meta<typeof LabelSwitch> = {
  title: 'UI/LabelSwitch',
  component: LabelSwitch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the switch',
    },
    description: {
      control: 'text',
      description: 'Optional description text',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the switch is checked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Push Notifications',
    checked: false,
    onCheckedChange: (checked) => console.log('Checked:', checked),
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Email Notifications',
    description: 'Enable email notifications for new messages and updates.',
    checked: true,
    onCheckedChange: (checked) => console.log('Checked:', checked),
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark Mode',
    description: 'Switch to dark theme',
    checked: true,
    onCheckedChange: (checked) => console.log('Checked:', checked),
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Auto-save',
    description: 'Automatically save your work',
    checked: false,
    onCheckedChange: (checked) => console.log('Checked:', checked),
  },
};
