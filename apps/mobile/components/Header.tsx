import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from "react-native";
import { useTheme } from "@repo/ui";

export type HeaderProps = {
  title?: string;
  onMenuPress?: () => void;
  notificationCount?: number;
  onNotificationPress?: () => void;
};

export function Header({
  title = "Home",
  onMenuPress,
  notificationCount = 0,
  onNotificationPress,
}: HeaderProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const statusBarHeight = Platform.OS === "android" 
    ? StatusBar.currentHeight || 24 
    : Platform.OS === "ios" 
    ? 44 
    : 0; // Web has no status bar

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    border: isDark ? "#49454F" : "#CAC4D0",
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
      <View style={styles.content}>
        {/* Hamburger Menu */}
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <View style={styles.hamburger}>
            <View style={[styles.hamburgerLine, { backgroundColor: colors.text }]} />
            <View style={[styles.hamburgerLine, { backgroundColor: colors.text }]} />
            <View style={[styles.hamburgerLine, { backgroundColor: colors.text }]} />
          </View>
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

        {/* Notifications */}
        <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
          <View style={styles.bellContainer}>
            <View style={[styles.bellTop, { borderColor: colors.text }]} />
            <View style={[styles.bellBottom, { backgroundColor: colors.text }]} />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {notificationCount > 99 ? "99+" : notificationCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  content: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  hamburger: {
    width: 20,
    gap: 4,
  },
  hamburgerLine: {
    height: 2,
    width: 20,
    borderRadius: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  bellContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  bellTop: {
    width: 16,
    height: 14,
    borderWidth: 2,
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  bellBottom: {
    width: 8,
    height: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: -1,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#FF3B30",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "white",
  },
});

export default Header;
