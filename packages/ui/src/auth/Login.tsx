"use client";

import React, { useState } from "react";
import { YStack, XStack, Input, Text } from "tamagui";
import { Button } from "../button/Button";
import { useAuth } from "@repo/core";

export type LoginProps = {
  onSuccess?: (user: { id: string; email: string }) => void;
  title?: string;
};

export function Login({ onSuccess, title = "Login" }: LoginProps) {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const u = await login(email, password);
      setLoading(false);
      if (onSuccess) onSuccess(u);
    } catch (e) {
      setLoading(false);
      setError((e as Error)?.message || "Login failed");
    }
  };

  if (user) {
    return (
      <YStack space>
        <Text>{`Login success — Hi ${user?.email}`}</Text>
      </YStack>
    );
  }

  return (
    <YStack gap={12} width="100%" maxW={400}>
      <Text fontSize={24} fontWeight="600">
        {title}
      </Text>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        width="100%"
      />

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        width="100%"
      />

      {error ? <Text color="red">{error}</Text> : null}

      <Button onPress={handleSubmit}>
        {loading ? "Logging in..." : "Login"}
      </Button>
    </YStack>
  );
}

export default Login;
