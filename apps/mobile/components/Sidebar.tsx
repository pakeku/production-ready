import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar, Pressable, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { SwitchTheme, useTheme } from "@repo/ui";

export type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
  userEmail?: string;
  onNavigate?: (screen: string) => void;
};

type MenuItem = {
  key: string;
  label: string;
  icon: string;
};

const menuItems: MenuItem[] = [
  { key: "home", label: "Home", icon: "🏠" },
  { key: "service", label: "Services", icon: "🛎️" },
  { key: "amenities", label: "Amenities", icon: "🏊" },
  { key: "explore", label: "Explore", icon: "📍" },
  { key: "settings", label: "Settings", icon: "⚙️" },
  { key: "help", label: "Help & Support", icon: "❓" },
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SIDEBAR_WIDTH = Math.min(280, SCREEN_WIDTH * 0.8);

export function Sidebar({
  isOpen,
  onClose,
  userName = "Guest User",
  userEmail = "guest@example.com",
  onNavigate,
}: SidebarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const statusBarHeight = Platform.OS === "android" 
    ? StatusBar.currentHeight || 24 
    : Platform.OS === "ios" 
    ? 44 
    : 0; // Web has no status bar

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
  };

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? 1 : 0, { duration: 200 }),
    pointerEvents: isOpen ? "auto" : "none",
  }));

  const sidebarStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(isOpen ? 0 : -SIDEBAR_WIDTH, { duration: 250 }),
      },
    ],
    shadowOpacity: withTiming(isOpen ? 0.25 : 0, { duration: 200 }),
    elevation: isOpen ? 8 : 0,
  }));

  return (
    <>
      {/* Overlay */}
      <Animated.View style={[styles.overlay, overlayStyle]}>
        <Pressable style={styles.overlayPressable} onPress={onClose} />
      </Animated.View>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { width: SIDEBAR_WIDTH }, sidebarStyle]}>
        <View style={[styles.sidebarContent, { paddingTop: statusBarHeight, backgroundColor: colors.background }]}>
          {/* User Profile Section */}
          <View style={[styles.profileSection, { backgroundColor: colors.backgroundStrong }]}>
            <View style={[styles.avatar, { backgroundColor: colors.text }]}>
              <Text style={[styles.avatarText, { color: colors.background }]}>
                {userName.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.userName, { color: colors.text }]}>{userName}</Text>
              <Text style={[styles.userEmail, { color: colors.subtle }]}>{userEmail}</Text>
            </View>
          </View>

          <View style={[styles.separator, { backgroundColor: colors.border }]} />

          {/* Menu Items */}
          <View style={styles.menuContainer}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.menuItem}
                onPress={() => {
                  onNavigate?.(item.key);
                  onClose();
                }}
                activeOpacity={0.7}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Section */}
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
          <View style={styles.bottomSection}>
            <View style={styles.themeRow}>
              <Text style={[styles.themeLabel, { color: colors.subtle }]}>Dark Mode</Text>
              <SwitchTheme />
            </View>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onNavigate?.("logout");
                onClose();
              }}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>🚪</Text>
              <Text style={[styles.menuLabel, { color: colors.subtle }]}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 100,
  },
  overlayPressable: {
    flex: 1,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 101,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 8,
  },
  sidebarContent: {
    flex: 1,
  },
  profileSection: {
    padding: 20,
    gap: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "600",
  },
  profileInfo: {
    gap: 4,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 14,
  },
  separator: {
    height: 1,
    marginVertical: 8,
  },
  menuContainer: {
    flex: 1,
    padding: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuLabel: {
    fontSize: 16,
  },
  bottomSection: {
    padding: 20,
    gap: 16,
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  themeLabel: {
    fontSize: 14,
  },
});

export default Sidebar;
