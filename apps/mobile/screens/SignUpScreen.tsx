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
import { useSignUp } from "@clerk/clerk-expo";
import { useTheme } from "@repo/ui";

type SignUpScreenProps = {
  onSignInPress: () => void;
};

export function SignUpScreen({ onSignInPress }: SignUpScreenProps) {
  const { signUp, setActive, isLoaded } = useSignUp();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
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
    success: "#1B5E20",
    inputBg: isDark ? "#2B2930" : "#F3EDF7",
  };

  const handleSignUp = useCallback(async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Sign up failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signUp, firstName, lastName, email, password]);

  const handleVerifyEmail = useCallback(async () => {
    if (!isLoaded) return;

    setLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Invalid verification code.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isLoaded, signUp, setActive, code]);

  if (pendingVerification) {
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
            <Text style={styles.verifyEmoji}>✉️</Text>
            <Text style={[styles.title, { color: colors.text }]}>Check Your Email</Text>
            <Text style={[styles.subtitle, { color: colors.subtle }]}>
              We've sent a verification code to {email}
            </Text>
          </View>

          <View style={styles.form}>
            {error ? (
              <View style={[styles.errorContainer, { backgroundColor: `${colors.error}15` }]}>
                <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Verification Code</Text>
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

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.accent }]}
              onPress={handleVerifyEmail}
              disabled={loading || code.length < 6}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Verify Email</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setPendingVerification(false)}
            >
              <Text style={[styles.backButtonText, { color: colors.subtle }]}>
                ← Back to sign up
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
            Join Self-Service for a better stay
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {error ? (
            <View style={[styles.errorContainer, { backgroundColor: `${colors.error}15` }]}>
              <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.nameRow}>
            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={[styles.label, { color: colors.text }]}>First Name</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBg,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="John"
                placeholderTextColor={colors.subtle}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoComplete="given-name"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfInput]}>
              <Text style={[styles.label, { color: colors.text }]}>Last Name</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBg,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Doe"
                placeholderTextColor={colors.subtle}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                autoComplete="family-name"
              />
            </View>
          </View>

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
              placeholder="Create a password"
              placeholderTextColor={colors.subtle}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />
            <Text style={[styles.passwordHint, { color: colors.subtle }]}>
              At least 8 characters
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={handleSignUp}
            disabled={loading || !email || !password || !firstName || !lastName}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Create Account</Text>
            )}
          </TouchableOpacity>

          <Text style={[styles.terms, { color: colors.subtle }]}>
            By creating an account, you agree to our{" "}
            <Text style={{ color: colors.accent }}>Terms of Service</Text> and{" "}
            <Text style={{ color: colors.accent }}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.subtle }]}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={onSignInPress}>
            <Text style={[styles.footerLink, { color: colors.accent }]}>Sign In</Text>
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
    marginBottom: 32,
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
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  inputGroup: {
    marginBottom: 20,
  },
  halfInput: {
    flex: 1,
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
  terms: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 16,
    lineHeight: 18,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: "600",
  },
});
