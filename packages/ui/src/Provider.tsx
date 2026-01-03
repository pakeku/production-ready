"use client";

import React, { ReactNode } from "react";
import { TamaguiProvider, Theme } from "tamagui";
import config from "../tamagui.config";

export function UiProvider({ children }: { children: ReactNode }) {
  return (
    <TamaguiProvider config={config}>
      <Theme name="light">{children}</Theme>
    </TamaguiProvider>
  );
}
