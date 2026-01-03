import React, { ReactNode } from "react";
import { YStack } from "tamagui";

export function ScreenCenter({ children }: { children?: ReactNode }) {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center" width="100%" minHeight="100vh">
      {children}
    </YStack>
  );
}

export default ScreenCenter;
