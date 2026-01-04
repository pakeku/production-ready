import React, { useState } from "react";
import { YStack, XStack, Text, Card } from "tamagui";
import { SwitchTheme, useTheme } from "@repo/ui";

export default {
  title: "UI/ThemeSwitch",
  component: SwitchTheme,
  parameters: {
    docs: {
      description: {
        component:
          "Theme toggle switch component from Tamagui. Switch between light and dark themes across web and native platforms.",
      },
    },
  },
};

export const Default = () => {
  const { theme } = useTheme();

  return (
    <YStack p="$4" gap="$4">
      <Card
        padded
        elevate
        bordered
      >
        <YStack gap="$4">
          <Text fontSize="$5" fontWeight="bold">Theme Toggle</Text>
          <XStack gap="$3">
            <Text>Dark Mode</Text>
            <SwitchTheme />
          </XStack>
          <Text fontSize="$3">Current theme: {theme}</Text>
        </YStack>
      </Card>
    </YStack>
  );
};
