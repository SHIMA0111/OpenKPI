import type { Meta, StoryObj } from '@storybook/react';
import { ColorModeButton, ColorModeIcon, useColorMode } from '../color-mode';
import { Box, Text } from '@chakra-ui/react';

const meta: Meta<typeof ColorModeButton> = {
  title: 'UI/ColorMode',
  component: ColorModeButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {},
};

export const Icon: Story = {
  render: () => <ColorModeIcon />,
};

function ColorModeDemo() {
  const { colorMode, toggleColorMode } = useColorMode();
  
  return (
    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
      <Text mb={2}>Current mode: {colorMode}</Text>
      <ColorModeButton />
    </Box>
  );
}

export const Demo: Story = {
  render: () => <ColorModeDemo />,
};
