import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Switch, useTheme } from "@repo/ui";

type SettingItem = {
  icon: string;
  label: string;
  description?: string;
  type: "toggle" | "link" | "theme";
  value?: boolean;
};

export function SettingsScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [settings, setSettings] = useState({
    notifications: true,
    biometric: true,
    locationServices: false,
    analytics: true,
    marketing: false,
  });

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
    backgroundHover: isDark ? "#2B2930" : "#F3EDF7",
  };

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationSettings: SettingItem[] = [
    {
      icon: "🔔",
      label: "Push Notifications",
      description: "Receive push notifications for transactions",
      type: "toggle",
      value: settings.notifications,
    },
    {
      icon: "📧",
      label: "Email Notifications",
      description: "Receive email updates and newsletters",
      type: "toggle",
      value: settings.marketing,
    },
  ];

  const securitySettings: SettingItem[] = [
    {
      icon: "🔐",
      label: "Biometric Login",
      description: "Use Face ID or fingerprint to login",
      type: "toggle",
      value: settings.biometric,
    },
    { icon: "🔑", label: "Change Password", type: "link" },
    { icon: "📱", label: "Two-Factor Authentication", type: "link" },
  ];

  const appSettings: SettingItem[] = [
    {
      icon: "🌙",
      label: "Theme",
      description: `Using system theme (${theme === "dark" ? "Dark" : "Light"})`,
      type: "link",
    },
    {
      icon: "📍",
      label: "Location Services",
      description: "Allow app to access your location",
      type: "toggle",
      value: settings.locationServices,
    },
    {
      icon: "📊",
      label: "Analytics",
      description: "Help improve the app by sharing usage data",
      type: "toggle",
      value: settings.analytics,
    },
  ];

  const renderSettingItem = (item: SettingItem, key: string, isLast: boolean) => (
    <View
      key={item.label}
      style={[styles.settingItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.settingIcon, { backgroundColor: colors.backgroundHover }]}>
          <Text style={styles.settingEmoji}>{item.icon}</Text>
        </View>
        <View style={styles.settingInfo}>
          <Text style={[styles.settingLabel, { color: colors.text }]}>{item.label}</Text>
          {item.description && (
            <Text style={[styles.settingDescription, { color: colors.subtle }]}>{item.description}</Text>
          )}
        </View>
      </View>
      {item.type === "toggle" && (
        <Switch checked={item.value} onCheckedChange={() => toggleSetting(key as keyof typeof settings)} />
      )}

      {item.type === "link" && <Text style={[styles.chevron, { color: colors.subtle }]}>›</Text>}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Notifications */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.subtle }]}>NOTIFICATIONS</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {notificationSettings.map((item, index) =>
              renderSettingItem(item, item.label === "Push Notifications" ? "notifications" : "marketing", index === notificationSettings.length - 1)
            )}
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.subtle }]}>SECURITY</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {securitySettings.map((item, index) =>
              renderSettingItem(item, item.label === "Biometric Login" ? "biometric" : item.label, index === securitySettings.length - 1)
            )}
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.subtle }]}>APP SETTINGS</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {appSettings.map((item, index) =>
              renderSettingItem(
                item,
                item.label === "Location Services" ? "locationServices" : item.label === "Analytics" ? "analytics" : item.label,
                index === appSettings.length - 1
              )
            )}
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.subtle }]}>ABOUT</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity style={[styles.linkItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
              <View style={styles.linkLeft}>
                <Text style={styles.linkIcon}>📜</Text>
                <Text style={[styles.linkLabel, { color: colors.text }]}>Terms of Service</Text>
              </View>
              <Text style={[styles.chevron, { color: colors.subtle }]}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.linkItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
              <View style={styles.linkLeft}>
                <Text style={styles.linkIcon}>🔒</Text>
                <Text style={[styles.linkLabel, { color: colors.text }]}>Privacy Policy</Text>
              </View>
              <Text style={[styles.chevron, { color: colors.subtle }]}>›</Text>
            </TouchableOpacity>
            <View style={styles.linkItem}>
              <View style={styles.linkLeft}>
                <Text style={styles.linkIcon}>ℹ️</Text>
                <Text style={[styles.linkLabel, { color: colors.text }]}>App Version</Text>
              </View>
              <Text style={[styles.linkValue, { color: colors.subtle }]}>1.0.0</Text>
            </View>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: "#FF3B30" }]}>DANGER ZONE</Text>
          <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: "#FF3B30" }]}>
            <TouchableOpacity style={[styles.linkItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
              <View style={styles.linkLeft}>
                <Text style={styles.linkIcon}>📤</Text>
                <Text style={[styles.linkLabel, { color: colors.text }]}>Export Data</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkItem}>
              <View style={styles.linkLeft}>
                <Text style={styles.linkIcon}>🗑️</Text>
                <Text style={[styles.linkLabel, { color: "#FF3B30" }]}>Delete Account</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 4,
  },
  sectionCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  settingEmoji: {
    fontSize: 20,
  },
  settingInfo: {
    flex: 1,
    gap: 2,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  settingDescription: {
    fontSize: 13,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  linkLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  linkIcon: {
    fontSize: 20,
  },
  linkLabel: {
    fontSize: 15,
  },
  linkValue: {
    fontSize: 14,
  },
  chevron: {
    fontSize: 20,
  },
});

export default SettingsScreen;
