import React, { ReactNode } from "react";
import { H1, H2, H3, H4, H5, H6, Text } from "tamagui";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";

export type TypographyProps = {
  variant?: TypographyVariant;
  children: ReactNode;
  color?: string;
};

const variantMap = {
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
    <Component color={color as any}>
      {children}
    </Component>
  );
}
