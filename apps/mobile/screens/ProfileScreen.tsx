import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { Button, useTheme } from "@repo/ui";

type ProfileMenuItem = {
  icon: string;
  label: string;
  value?: string;
  chevron?: boolean;
};

const accountItems: ProfileMenuItem[] = [
  { icon: "👤", label: "Personal Information", chevron: true },
  { icon: "🔐", label: "Security", value: "2FA Enabled", chevron: true },
  { icon: "💳", label: "Payment Methods", value: "3 cards", chevron: true },
  { icon: "📍", label: "Addresses", value: "2 saved", chevron: true },
];

const preferencesItems: ProfileMenuItem[] = [
  { icon: "🔔", label: "Notifications", chevron: true },
  { icon: "🌐", label: "Language", value: "English", chevron: true },
  { icon: "💱", label: "Currency", value: "USD", chevron: true },
];

export function ProfileScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
  };

  const renderMenuSection = (title: string, items: ProfileMenuItem[]) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.subtle }]}>{title}</Text>
      <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.menuItem,
              index < items.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuItemIcon}>{item.icon}</Text>
              <Text style={[styles.menuItemLabel, { color: colors.text }]}>{item.label}</Text>
            </View>
            <View style={styles.menuItemRight}>
              {item.value && <Text style={[styles.menuItemValue, { color: colors.subtle }]}>{item.value}</Text>}
              {item.chevron && <Text style={[styles.chevron, { color: colors.subtle }]}>›</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={[styles.profileCard, { backgroundColor: colors.backgroundStrong }]}>
          <View style={[styles.avatar, { backgroundColor: colors.text }]}>
            <Text style={[styles.avatarText, { color: colors.background }]}>JD</Text>
          </View>
          <Text style={[styles.userName, { color: colors.text }]}>John Doe</Text>
          <Text style={[styles.userEmail, { color: colors.subtle }]}>john.doe@example.com</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>127</Text>
              <Text style={[styles.statLabel, { color: colors.subtle }]}>Transactions</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>Gold</Text>
              <Text style={[styles.statLabel, { color: colors.subtle }]}>Member Status</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>2.5k</Text>
              <Text style={[styles.statLabel, { color: colors.subtle }]}>Points</Text>
            </View>
          </View>
        </View>

        {/* Account Section */}
        {renderMenuSection("ACCOUNT", accountItems)}

        {/* Preferences Section */}
        {renderMenuSection("PREFERENCES", preferencesItems)}

        {/* Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.subtle }]}>SUPPORT</Text>
          <View style={[styles.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.menuItem, { borderBottomWidth: 1, borderBottomColor: colors.border }]}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuItemIcon}>❓</Text>
                <Text style={[styles.menuItemLabel, { color: colors.text }]}>Help Center</Text>
              </View>
              <Text style={[styles.chevron, { color: colors.subtle }]}>›</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuItemIcon}>💬</Text>
                <Text style={[styles.menuItemLabel, { color: colors.text }]}>Contact Us</Text>
              </View>
              <Text style={[styles.chevron, { color: colors.subtle }]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Version Info */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.subtle }]}>Version 1.0.0</Text>
          <Text style={[styles.footerText, { color: colors.subtle }]}>Made with ❤️ using Tamagui</Text>
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
  profileCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
  },
  userName: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 8,
  },
  userEmail: {
    fontSize: 14,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    paddingHorizontal: 4,
  },
  menuCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemIcon: {
    fontSize: 20,
  },
  menuItemLabel: {
    fontSize: 15,
  },
  menuItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuItemValue: {
    fontSize: 14,
  },
  chevron: {
    fontSize: 20,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
  },
});

export default ProfileScreen;
