// import React from 'react';
import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Typography } from '@repo/ui';
import { YStack } from 'tamagui';

const meta: Meta<typeof Typography> = {
    title: 'Typography/Typography',
    component: Typography,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Flexible Typography component that transforms content into semantic heading and text elements (H1-H6) from Tamagui. Accepts any React node as children.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Typography>;

export const AllVariants: Story = {
    render: () => (
        <YStack gap="$4" p="$4">
            <Typography variant="h1">Heading 1 - Main Title</Typography>
            <Typography variant="h2">Heading 2 - Section Title</Typography>
            <Typography variant="h3">Heading 3 - Subsection Title</Typography>
            <Typography variant="h4">Heading 4 - Minor Heading</Typography>
            <Typography variant="h5">Heading 5 - Small Heading</Typography>
            <Typography variant="h6">Heading 6 - Smallest Heading</Typography>
            <Typography variant="body">Body text - This is regular paragraph text for content.</Typography>
        </YStack>
    ),
};

export const H1: Story = {
    render: () => (
        <Typography variant="h1">This is a Heading 1</Typography>
    ),
};

export const H2: Story = {
    render: () => (
        <Typography variant="h2">This is a Heading 2</Typography>
    ),
};

export const H3: Story = {
    render: () => (
        <Typography variant="h3">This is a Heading 3</Typography>
    ),
};

export const Body: Story = {
    render: () => (
        <Typography variant="body">
            This is body text. It can contain any React node and will be rendered as regular text using Tamagui's Text component.
        </Typography>
    ),
};

export const WithColor: Story = {
    render: () => (
        <YStack gap="$3" p="$4">
            <Typography variant="h1" color="$blue10">Colored Heading</Typography>
            <Typography variant="h2" color="$green10">Green Subheading</Typography>
            <Typography variant="body" color="$gray10">Colored body text</Typography>
        </YStack>
    ),
};

export const RichContent: Story = {
    render: () => (
        <YStack gap="$4" p="$4">
            <Typography variant="h1">
                Welcome to <span style={{ color: '#0066cc' }}>Our Site</span>
            </Typography>
            <Typography variant="body">
                You can include any React node, including <strong>bold text</strong>, <em>italic text</em>, or other components.
            </Typography>
        </YStack>
    ),
};
