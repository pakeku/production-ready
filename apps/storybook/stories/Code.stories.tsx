import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Code } from '@repo/ui';
import { YStack, Text } from 'tamagui';

const meta: Meta<typeof Code> = {
    title: 'UI/Code',
    component: Code,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'Code component for displaying code snippets with syntax highlighting support. Supports inline and block variants with optional line numbers.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof Code>;

export const Inline: Story = {
    render: () => (
        <YStack gap="$3" p="$4">
            <Text>Here is an inline code example: </Text>
            <Text>
                Use <Code variant="inline">npm install</Code> to install dependencies.
            </Text>
        </YStack>
    ),
};

export const BlockJavaScript: Story = {
    render: () => (
        <Code language="javascript">
{`const greeting = "Hello, World!";
console.log(greeting);

function add(a, b) {
  return a + b;
}

const result = add(5, 3);`}
        </Code>
    ),
};

export const BlockTypeScript: Story = {
    render: () => (
        <Code language="typescript">
{`interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return {
    id,
    name: "John Doe",
    email: "john@example.com"
  };
}`}
        </Code>
    ),
};

export const BlockWithLineNumbers: Story = {
    render: () => (
        <Code language="python" showLineNumbers>
{`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

result = fibonacci(10)
print(result)`}
        </Code>
    ),
};

export const BlockJSON: Story = {
    render: () => (
        <Code language="json">
{`{
  "name": "my-project",
  "version": "1.0.0",
  "description": "A sample project",
  "dependencies": {
    "react": "^18.0.0",
    "tamagui": "^1.0.0"
  }
}`}
        </Code>
    ),
};

export const BlockHTML: Story = {
    render: () => (
        <Code language="html">
{`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello World</title>
</head>
<body>
  <h1>Welcome!</h1>
</body>
</html>`}
        </Code>
    ),
};

export const LongCodeBlock: Story = {
    render: () => (
        <Code language="javascript" showLineNumbers maxHeight="300px">
{`// This is a longer code block that will be scrollable
function processData(items) {
  return items
    .filter(item => item.active)
    .map(item => ({
      ...item,
      processed: true,
      timestamp: new Date()
    }))
    .sort((a, b) => b.timestamp - a.timestamp);
}

const data = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true },
];

const result = processData(data);
console.log(result);

// Even more code here...
function validateUser(user) {
  if (!user.name) throw new Error("Name required");
  if (!user.email) throw new Error("Email required");
  return true;
}

validateUser({ name: "John", email: "john@example.com" });`}
        </Code>
    ),
};
