"use client";

import React from "react";
import { H1, H2, H3, H4, H5, H6, Text } from "tamagui";
import type { TypographyProps, TypographyVariant } from "./Typography";

const variantMap: Record<TypographyVariant, any> = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  body: Text,
};

export function Typography({ variant = "body", children, color }: TypographyProps) {
  const Component = variantMap[variant];
  
  return (
    <Component color={color}>
      {children}
    </Component>
  );
}
