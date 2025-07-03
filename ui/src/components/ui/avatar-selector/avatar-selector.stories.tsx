import type { Meta, StoryObj } from '@storybook/react';
import { AvatarSelector } from './index';

const meta: Meta<typeof AvatarSelector> = {
  title: 'UI/AvatarSelector',
  component: AvatarSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name for the avatar fallback',
    },
    label: {
      control: 'text',
      description: 'Label for the avatar selector',
    },
    initialImageUrl: {
      control: 'text',
      description: 'Initial image URL for the avatar',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    onAvatarChange: (avatarType: string) => console.log('Avatar changed to:', avatarType),
  },
};

export const WithLabel: Story = {
  args: {
    name: 'John Doe',
    label: 'User Avatar',
    onAvatarChange: (avatarType: string) => console.log('Avatar changed to:', avatarType),
  },
};

export const WithImage: Story = {
  args: {
    name: 'John Doe',
    label: 'User Avatar',
    initialImageUrl: 'https://github.com/shadcn.png',
    onAvatarChange: (avatarType: string) => console.log('Avatar changed to:', avatarType),
  },
};
