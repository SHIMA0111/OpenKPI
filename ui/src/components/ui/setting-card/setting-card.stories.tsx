import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LuSettings, LuBell, LuShield } from 'react-icons/lu';
import { SettingCard } from './index';
import { Text, Button } from '@chakra-ui/react';

const meta: Meta<typeof SettingCard> = {
  title: 'UI/SettingCard',
  component: SettingCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the setting card',
    },
    description: {
      control: 'text',
      description: 'Description of the setting card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Basic Settings',
    description: 'Configure your basic account settings and preferences.',
    children: <Text>Card content goes here</Text>,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Notification Settings',
    titleIcon: <LuBell />,
    description: 'Manage your notification preferences.',
    children: <Text>Notification settings content</Text>,
  },
};

export const SecurityCard: Story = {
  args: {
    title: 'Security Settings',
    titleIcon: <LuShield />,
    description: 'Manage your security and privacy settings.',
    children: (
      <div>
        <Text mb={3}>Security options:</Text>
        <Button size="sm">Change Password</Button>
      </div>
    ),
  },
};

export const SettingsCard: Story = {
  args: {
    title: 'General Settings',
    titleIcon: <LuSettings />,
    description: 'General application settings and preferences.',
    children: (
      <div>
        <Text mb={2}>Various settings controls would go here</Text>
        <Button size="sm" variant="outline">Save Changes</Button>
      </div>
    ),
  },
};
