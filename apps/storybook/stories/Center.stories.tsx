import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ScreenCenter } from '@repo/ui';
import { Card, Text, YStack, Button } from 'tamagui';

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
            <Card padded elevate bordered>
                <YStack gap="$3">
                    <Text fontSize="$6" fontWeight="bold">Centered Content</Text>
                    <Text>This content is centered both vertically and horizontally on the screen.</Text>
                </YStack>
            </Card>
        </ScreenCenter>
    ),
};

export const WithButton: Story = {
    render: () => (
        <ScreenCenter>
            <Card padded elevate bordered>
                <YStack gap="$4">
                    <Text fontSize="$6" fontWeight="bold">Welcome</Text>
                    <Text>Click the button to proceed</Text>
                    <Button>Get Started</Button>
                </YStack>
            </Card>
        </ScreenCenter>
    ),
};

export const LoginForm: Story = {
    render: () => (
        <ScreenCenter>
            <Card padded elevate bordered width={300}>
                <YStack gap="$4">
                    <Text fontSize="$5" fontWeight="bold">Login</Text>
                    <YStack gap="$2">
                        <Text fontSize="$3">Email</Text>
                        <input type="email" placeholder="your@email.com" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </YStack>
                    <YStack gap="$2">
                        <Text fontSize="$3">Password</Text>
                        <input type="password" placeholder="••••••••" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </YStack>
                    <Button width="100%">Sign In</Button>
                </YStack>
            </Card>
        </ScreenCenter>
    ),
};

export const EmptyState: Story = {
    render: () => (
        <ScreenCenter>
            <YStack gap="$4">
                <Text fontSize="$7">📭</Text>
                <Text fontSize="$5" fontWeight="bold">No Content</Text>
                <Text>This is an empty state centered on the screen</Text>
            </YStack>
        </ScreenCenter>
    ),
};