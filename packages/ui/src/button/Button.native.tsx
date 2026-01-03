import { Button as TButton } from "tamagui";
import type { ButtonProps } from "./Button";

export function Button({ children, onPress }: ButtonProps) {
  return <TButton onPress={onPress}>{children}</TButton>;
}
