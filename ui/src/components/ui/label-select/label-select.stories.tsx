import type { Meta, StoryObj } from '@storybook/react';
import LabelSelect from './label-select';

const meta: Meta<typeof LabelSelect> = {
  title: 'UI/LabelSelect',
  component: LabelSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the select field',
    },
    value: {
      control: 'text',
      description: 'Currently selected value',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const languageOptions = [
  { label: 'English', value: 'en' },
  { label: '日本語', value: 'ja' },
  { label: '한국어', value: 'ko' },
];

const timezoneOptions = [
  { label: 'Asia/Tokyo', value: 'Asia/Tokyo' },
  { label: 'America/New_York', value: 'America/New_York' },
  { label: 'Europe/London', value: 'Europe/London' },
  { label: 'UTC', value: 'UTC' },
];

export const Default: Story = {
  args: {
    label: 'Language',
    options: languageOptions,
    value: 'en',
    onValueChange: (value) => console.log('Selected:', value),
  },
};

export const Timezone: Story = {
  args: {
    label: 'Timezone',
    options: timezoneOptions,
    value: 'Asia/Tokyo',
    onValueChange: (value) => console.log('Selected:', value),
  },
};

export const NoSelection: Story = {
  args: {
    label: 'Language',
    options: languageOptions,
    value: '',
    onValueChange: (value) => console.log('Selected:', value),
  },
};
