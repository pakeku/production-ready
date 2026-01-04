import React, { ReactNode } from "react";
import { XStack, YStack, Text, useTheme } from "tamagui";

export type CodeProps = {
  children: ReactNode;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
  variant?: "inline" | "block";
};

export function Code({
  children,
  language = "javascript",
  showLineNumbers = false,
  maxHeight = "400px",
  variant = "block",
}: CodeProps) {
  const theme = useTheme();
  
  // Theme-aware colors
  const isDark = theme.background.val === "#000000" || theme.background.val === "#1a1a1a";
  const codeBackground = isDark ? "#1a1a1a" : "#f5f5f5";
  const codeBorder = isDark ? "#333" : "#e0e0e0";
  const codeText = isDark ? "#e0e0e0" : "#1a1a1a";
  const codeLineNumber = isDark ? "#666" : "#999";
  const codeLabel = isDark ? "#999" : "#666";
  const inlineBg = isDark ? "#2a2a2a" : "#f0f0f0";

  if (variant === "inline") {
    return (
      <Text
        fontSize="$3"
        style={{
          whiteSpace: "nowrap",
          fontFamily: "monospace",
          backgroundColor: inlineBg,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
          color: codeText,
        }}
      >
        {children}
      </Text>
    );
  }

  const codeString = typeof children === "string" ? children : "";
  const lines = codeString.split("\n");

  return (
    <YStack
      background="$gray2"
      borderWidth={1}
      style={{ borderColor: codeBorder, overflowY: "auto", maxHeight, borderRadius: 12, backgroundColor: codeBackground }}
      overflow="hidden"
    >
      <YStack p="$3" gap="$2">
        <XStack gap="$2" mb="$2">
          <Text fontSize="$2" fontWeight="bold" style={{ color: codeLabel }}>
            {language}
          </Text>
        </XStack>
        <YStack gap="$1">
          {lines.map((line, index) => (
            <XStack key={index} gap="$2">
              {showLineNumbers && (
                <Text
                  fontSize="$2"
                  style={{
                    minWidth: 30,
                    textAlign: "right",
                    fontFamily: "monospace",
                    color: codeLineNumber,
                  }}
                >
                  {index + 1}
                </Text>
              )}
              <Text
                fontSize="$2"
                style={{
                  fontFamily: "monospace",
                  color: codeText,
                  whiteSpace: "pre-wrap",
                }}
              >
                {line || " "}
              </Text>
            </XStack>
          ))}
        </YStack>
      </YStack>
    </YStack>
  );
}
