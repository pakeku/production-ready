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

type ForgotPasswordScreenProps = {
  onBackToSignIn: () => void;
};

export function ForgotPasswordScreen({ onBackToSignIn }: ForgotPasswordScreenProps) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pendingReset, setPendingReset] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
    accent: "#6750A4",
    error: "#B3261E",
    success: "#1B5E20",
    inputBg: isDark ? "#2B2930" : "#F3EDF7",
  };

  const handleRequestReset = useCallback(async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setPendingReset(true);
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Failed to send reset code. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signIn, email]);

  const handleResetPassword = useCallback(async () => {
    if (!isLoaded) return;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        setSuccess(true);
        await setActive({ session: result.createdSessionId });
      } else {
        setError("Password reset incomplete. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Invalid code or password reset failed.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signIn, setActive, code, newPassword, confirmPassword]);

  if (success) {
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
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <Text style={[styles.brandIcon, { color: colors.accent }]}>✦</Text>
              <Text style={[styles.brandName, { color: colors.text }]}>Self-Service</Text>
            </View>
            <Text style={styles.successEmoji}>✅</Text>
            <Text style={[styles.title, { color: colors.text }]}>Password Reset!</Text>
            <Text style={[styles.subtitle, { color: colors.subtle }]}>
              Your password has been successfully reset. You're now signed in.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  if (pendingReset) {
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
          <View style={styles.header}>
            <View style={styles.brandRow}>
              <Text style={[styles.brandIcon, { color: colors.accent }]}>✦</Text>
              <Text style={[styles.brandName, { color: colors.text }]}>Self-Service</Text>
            </View>
            <Text style={styles.verifyEmoji}>🔐</Text>
            <Text style={[styles.title, { color: colors.text }]}>Reset Password</Text>
            <Text style={[styles.subtitle, { color: colors.subtle }]}>
              Enter the code sent to {email} and your new password
            </Text>
          </View>

          <View style={styles.form}>
            {error ? (
              <View style={[styles.errorContainer, { backgroundColor: `${colors.error}15` }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Reset Code</Text>
              <TextInput
                style={[
                  styles.input,
                  styles.codeInput,
                  {
                    backgroundColor: colors.inputBg,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="000000"
                placeholderTextColor={colors.subtle}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>New Password</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBg,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Enter new password"
                placeholderTextColor={colors.subtle}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoComplete="new-password"
              />
              <Text style={[styles.passwordHint, { color: colors.subtle }]}>
                At least 8 characters
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Confirm Password</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBg,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Confirm new password"
                placeholderTextColor={colors.subtle}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="new-password"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.accent }]}
              onPress={handleResetPassword}
              disabled={loading || code.length < 6 || !newPassword || !confirmPassword}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setPendingReset(false)}
            >
              <Text style={[styles.backButtonText, { color: colors.subtle }]}>
                ← Resend code
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

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
            Enter your email and we'll send you a reset code
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

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={handleRequestReset}
            disabled={loading || !email}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Send Reset Code</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={onBackToSignIn}>
            <Text style={[styles.footerLink, { color: colors.accent }]}>← Back to Sign In</Text>
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
  verifyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  successEmoji: {
    fontSize: 48,
    marginBottom: 16,
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
  codeInput: {
    textAlign: "center",
    fontSize: 24,
    letterSpacing: 8,
  },
  passwordHint: {
    fontSize: 12,
    marginTop: 6,
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
  backButton: {
    alignItems: "center",
    marginTop: 16,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
