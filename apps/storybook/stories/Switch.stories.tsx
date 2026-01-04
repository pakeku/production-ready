import React, { useState } from "react";
import { YStack, XStack, Text } from "tamagui";
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
      <YStack
        p="$4"
        gap="$4"
        borderWidth={1}
        style={{ borderColor: "#ddd" }}
      >
        <Text fontSize="$5" fontWeight="bold">Theme Toggle</Text>
        <XStack gap="$3">
          <Text>Dark Mode</Text>
          <SwitchTheme />
        </XStack>
        <Text fontSize="$3">Current theme: {theme}</Text>
      </YStack>
    </YStack>
  );
};
