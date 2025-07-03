import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LuMail, LuUser } from 'react-icons/lu';
import LabelInput from './label-input';

const meta: Meta<typeof LabelInput> = {
  title: 'UI/LabelInput',
  component: LabelInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input field',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the field has validation errors',
    },
    invalidMessage: {
      control: 'text',
      description: 'Error message to display when invalid',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    required: true,
  },
};

export const WithStartElement: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    startElement: <LuMail />,
  },
};

export const WithEndElement: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    endElement: <LuUser />,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    invalid: true,
    invalidMessage: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    disabled: true,
    value: 'disabled@example.com',
  },
};
