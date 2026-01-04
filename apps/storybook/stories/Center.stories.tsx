import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ScreenCenter } from '@repo/ui';
import { Text, YStack } from 'tamagui';

const meta: Meta<typeof ScreenCenter> = {
    title: 'Layout/ScreenCenter',
    component: ScreenCenter,
    tags: ['autodocs'],
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'ScreenCenter centers its children both vertically and horizontally, filling the entire screen. Perfect for login pages, splash screens, and full-page layouts.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof ScreenCenter>;

export const Default: Story = {
    render: () => (
        <ScreenCenter>
            <YStack gap="$3" p="$4" background="$gray3" style={{ borderRadius: 12 }}>
                <Text fontSize="$6" fontWeight="bold">Centered Content</Text>
                <Text>This content is centered both vertically and horizontally on the screen.</Text>
            </YStack>
        </ScreenCenter>
    ),
};

export const WithButton: Story = {
    render: () => (
        <ScreenCenter>
            <YStack gap="$4" p="$4" background="$gray3" style={{ borderRadius: 12 }}>
                <Text fontSize="$6" fontWeight="bold">Welcome</Text>
                <Text>Click the button to proceed</Text>
                <YStack background="$blue10" p="$3" style={{ borderRadius: 8 }}>
                    <Text style={{ color: "white" }} fontWeight="bold">Get Started</Text>
                </YStack>
            </YStack>
        </ScreenCenter>
    ),
};

export const LoginForm: Story = {
    render: () => (
        <ScreenCenter>
            <YStack gap="$4" p="$4" background="$gray3" style={{ borderRadius: 12 }} width={300}>
                <Text fontSize="$5" fontWeight="bold">Login</Text>
                <YStack gap="$2">
                    <Text fontSize="$3">Email</Text>
                    <input type="email" placeholder="your@email.com" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </YStack>
                <YStack gap="$2">
                    <Text fontSize="$3">Password</Text>
                    <input type="password" placeholder="••••••••" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </YStack>
                <YStack background="$blue10" p="$3" style={{ borderRadius: 8 }}>
                    <Text style={{ color: "white" }} fontWeight="bold">Sign In</Text>
                </YStack>
            </YStack>
        </ScreenCenter>
    ),
};

export const EmptyState: Story = {
    render: () => (
        <ScreenCenter>
            <YStack gap="$4" p="$4">
                <Text fontSize="$7">📭</Text>
                <Text fontSize="$5" fontWeight="bold">No Content</Text>
                <Text>This is an empty state centered on the screen</Text>
            </YStack>
        </ScreenCenter>
    ),
};