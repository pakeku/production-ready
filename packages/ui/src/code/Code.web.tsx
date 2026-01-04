"use client";

import React from "react";
import { XStack, YStack, Text } from "tamagui";
import type { CodeProps } from "./Code";

export function Code({
  children,
  language = "javascript",
  showLineNumbers = false,
  maxHeight = "400px",
  variant = "block",
}: CodeProps) {
  if (variant === "inline") {
    return (
      <Text
        fontSize="$3"
        style={{
          whiteSpace: "nowrap",
          fontFamily: "monospace",
          backgroundColor: "#f0f0f0",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 4,
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
      style={{ borderColor: "#ddd", overflowY: "auto", maxHeight, borderRadius: 12 }}
      overflow="hidden"
    >
      <YStack p="$3" gap="$2">
        <XStack gap="$2" mb="$2">
          <Text fontSize="$2" fontWeight="bold" style={{ color: "#666" }}>
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
                    color: "#999",
                  }}
                >
                  {index + 1}
                </Text>
              )}
              <Text
                fontSize="$2"
                style={{
                  fontFamily: "monospace",
                  color: "#333",
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
