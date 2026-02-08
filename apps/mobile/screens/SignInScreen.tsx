import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useTheme } from "@repo/ui";

type SignInScreenProps = {
  onSignUpPress: () => void;
  onForgotPasswordPress: () => void;
};

export function SignInScreen({ onSignUpPress, onForgotPasswordPress }: SignInScreenProps) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
    accent: "#6750A4",
    error: "#B3261E",
    inputBg: isDark ? "#2B2930" : "#F3EDF7",
  };

  const handleSignIn = useCallback(async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        setError("Sign in incomplete. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Sign in failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signIn, setActive, email, password]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo / Brand */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <Text style={[styles.brandIcon, { color: colors.accent }]}>✦</Text>
            <Text style={[styles.brandName, { color: colors.text }]}>Self-Service</Text>
          </View>
          <Text style={[styles.subtitle, { color: colors.subtle }]}>
            Sign in to your Self-Service account
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {error ? (
            <View style={[styles.errorContainer, { backgroundColor: `${colors.error}15` }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="your@email.com"
              placeholderTextColor={colors.subtle}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors.inputBg,
                  color: colors.text,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Enter your password"
              placeholderTextColor={colors.subtle}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={handleSignIn}
            disabled={loading || !email || !password}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotPassword} onPress={onForgotPasswordPress}>
            <Text style={[styles.forgotPasswordText, { color: colors.accent }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.subtle }]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={onSignUpPress}>
            <Text style={[styles.footerLink, { color: colors.accent }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  brandIcon: {
    fontSize: 32,
    fontWeight: "700",
  },
  brandName: {
    fontSize: 24,
    fontWeight: "700",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  errorContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
