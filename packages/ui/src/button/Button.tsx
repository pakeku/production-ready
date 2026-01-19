import React from "react";
import { Button as TButton, ThemeableStack } from "tamagui";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonState = "default" | "disabled" | "loading";

export interface ButtonProps {
  /** Button color variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Button state */
  state?: ButtonState;
  /** Button label */
  children: React.ReactNode;
  /** Click handler */
  onPress?: () => void;
  /** Whether the button is full width */
  fullWidth?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
}

/**
 * Material Design 3 Button Component
 * Supports primary, secondary, and tertiary variants
 * Works across Web, iOS, and Android
 */
export function Button({
  variant = "primary",
  size = "md",
  state = "default",
  children,
  onPress,
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  // Padding adjustments per size
  const paddingMap: Record<ButtonSize, { px: number; py: number }> = {
    sm: { px: 12, py: 6 },
    md: { px: 24, py: 10 },
    lg: { px: 32, py: 14 },
  };

  // Font size per size
  const fontSizeMap: Record<ButtonSize, number> = {
    sm: 12,
    md: 14,
    lg: 16,
  };

  const isDisabled = state === "disabled" || disabled;
  const isLoading = state === "loading";

  const baseTheme = variant === "primary" ? "primary" : variant === "secondary" ? "secondary" : "tertiary";

  const padding = paddingMap[size];
  const fontSize = fontSizeMap[size];

  return (
    <ThemeableStack theme={baseTheme as any}>
      <TButton
        disabled={isDisabled || isLoading}
        opacity={isDisabled ? 0.5 : 1}
        px={padding.px}
        py={padding.py}
        onPress={onPress}
        width={fullWidth ? "100%" : "auto"}
      >
        <TButton.Text
          fontSize={fontSize}
          fontWeight="600"
          opacity={isLoading ? 0.5 : 1}
        >
          {children}
        </TButton.Text>
      </TButton>
    </ThemeableStack>
  );
}

// Export for cherry-picking
export default Button;
