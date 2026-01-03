import React from "react";
import { Button as TButton } from "tamagui";

export type ButtonProps = {
  children: React.ReactNode;
  onPress?: () => void;
};

export function Button({ children, onPress }: ButtonProps) {
  return <TButton onPress={onPress}>{children}</TButton>;
}
