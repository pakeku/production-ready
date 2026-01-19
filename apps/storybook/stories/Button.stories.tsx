import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@repo/ui';
import { YStack, XStack, Text } from 'tamagui';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    state: {
      control: 'select',
      options: ['default', 'disabled', 'loading'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Primary Button
 */
export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
    onPress: () => alert('Button clicked!'),
  },
};

/**
 * All Sizes - Primary Variant
 */
export const Sizes: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => (
    <YStack gap="$4" padding="$4">
      <XStack gap="$2" alignItems="center">
        <Text>Small:</Text>
        <Button {...args} size="sm">
          Small Button
        </Button>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text>Medium:</Text>
        <Button {...args} size="md">
          Medium Button
        </Button>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text>Large:</Text>
        <Button {...args} size="lg">
          Large Button
        </Button>
      </XStack>
    </YStack>
  ),
};

/**
 * All Variants - Medium Size
 */
export const Variants: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <YStack gap="$4" padding="$4">
      <XStack gap="$2" alignItems="center">
        <Text>Primary:</Text>
        <Button {...args} variant="primary" onPress={() => alert('Primary clicked!')}>
          Primary
        </Button>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text>Secondary:</Text>
        <Button {...args} variant="secondary" onPress={() => alert('Secondary clicked!')}>
          Secondary
        </Button>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text>Tertiary:</Text>
        <Button {...args} variant="tertiary" onPress={() => alert('Tertiary clicked!')}>
          Tertiary
        </Button>
      </XStack>
    </YStack>
  ),
};

/**
 * All States
 */
export const States: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => (
    <YStack gap="$4" padding="$4">
      <XStack gap="$2" alignItems="center">
        <Text>Default:</Text>
        <Button {...args} state="default" onPress={() => alert('Clicked!')}>
          Default
        </Button>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text>Disabled:</Text>
        <Button {...args} state="disabled">
          Disabled
        </Button>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text>Loading:</Text>
        <Button {...args} state="loading">
          Loading...
        </Button>
      </XStack>
    </YStack>
  ),
};

/**
 * Full Width Button
 */
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    variant: 'primary',
    size: 'lg',
    fullWidth: true,
    onPress: () => alert('Full width button clicked!'),
  },
};

/**
 * All Combinations Showcase
 */
export const AllCombinations: Story = {
  render: () => (
    <YStack gap="$6" padding="$4">
      {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
        <YStack key={variant} gap="$3">
          <Text fontWeight="bold" fontSize={18} textTransform="capitalize">
            {variant} Variant
          </Text>
          <YStack gap="$2" paddingLeft="$2">
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <XStack key={`${variant}-${size}`} gap="$2" alignItems="center">
                <Text fontSize={12} width={80}>
                  {size.toUpperCase()}
                </Text>
                <Button
                  variant={variant}
                  size={size}
                  onPress={() => alert(`${variant} ${size} clicked!`)}
                >
                  {size.toUpperCase()} Button
                </Button>
                <Button variant={variant} size={size} state="disabled">
                  Disabled
                </Button>
              </XStack>
            ))}
          </YStack>
        </YStack>
      ))}
    </YStack>
  ),
};
