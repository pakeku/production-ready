import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { useTheme } from "@repo/ui";

export type TabItem = {
  key: string;
  label: string;
  icon: "home" | "service" | "amenities" | "explore" | "settings";
};

export type TabBarProps = {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
};

function TabIcon({ icon, active, colors }: { icon: TabItem["icon"]; active: boolean; colors: { text: string; subtle: string } }) {
  const color = active ? colors.text : colors.subtle;
  
  switch (icon) {
    case "home":
      return (
        <View style={styles.iconContainer}>
          {/* House icon */}
          <View style={[styles.homeBase, { borderColor: color }]} />
          <View style={[styles.homeRoof, { borderBottomColor: color }]} />
        </View>
      );
    case "service":
      return (
        <View style={styles.iconContainer}>
          {/* Bell/Service icon */}
          <View style={[styles.bellTop, { backgroundColor: color }]} />
          <View style={[styles.bellBody, { borderColor: color }]} />
          <View style={[styles.bellClapper, { backgroundColor: color }]} />
        </View>
      );
    case "amenities":
      return (
        <View style={styles.iconContainer}>
          {/* Building icon */}
          <View style={[styles.building, { borderColor: color }]}>
            <View style={styles.buildingWindows}>
              <View style={[styles.window, { backgroundColor: color }]} />
              <View style={[styles.window, { backgroundColor: color }]} />
            </View>
            <View style={styles.buildingWindows}>
              <View style={[styles.window, { backgroundColor: color }]} />
              <View style={[styles.window, { backgroundColor: color }]} />
            </View>
          </View>
          <View style={[styles.buildingDot, { backgroundColor: color }]} />
        </View>
      );
    case "explore":
      return (
        <View style={styles.iconContainer}>
          {/* Location pin icon */}
          <View style={[styles.locationPin, { borderColor: color }]}>
            <View style={[styles.locationDot, { backgroundColor: color }]} />
          </View>
          <View style={[styles.locationPoint, { borderTopColor: color }]} />
        </View>
      );
    case "settings":
      return (
        <View style={styles.iconContainer}>
          {/* Gear icon */}
          <View style={[styles.gearOuter, { borderColor: color }]} />
          <View style={[styles.gearInner, { borderColor: color }]} />
        </View>
      );
  }
}

export function TabBar({ tabs, activeTab, onTabPress }: TabBarProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bottomPadding = Platform.OS === "ios" ? 20 : 8;

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
  };

  return (
    <View style={[styles.container, { paddingBottom: bottomPadding, backgroundColor: colors.background, borderTopColor: colors.border }]}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <TabIcon icon={tab.icon} active={isActive} colors={colors} />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    fontWeight: isActive ? "600" : "400",
                    color: isActive ? colors.text : colors.subtle,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  // Home icon
  homeBase: {
    width: 18,
    height: 12,
    borderWidth: 2,
    borderRadius: 2,
    marginTop: 6,
  },
  homeRoof: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  // Bell/Service icon
  bellTop: {
    position: "absolute",
    top: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  bellBody: {
    width: 16,
    height: 12,
    borderWidth: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginTop: 4,
  },
  bellClapper: {
    position: "absolute",
    bottom: 2,
    width: 6,
    height: 3,
    borderRadius: 2,
  },
  // Building icon
  building: {
    width: 14,
    height: 18,
    borderWidth: 2,
    borderRadius: 2,
    padding: 1,
    justifyContent: "space-evenly",
  },
  buildingWindows: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  window: {
    width: 3,
    height: 3,
    borderRadius: 1,
  },
  buildingDot: {
    position: "absolute",
    top: -2,
    right: -4,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  // Location icon
  locationPin: {
    width: 14,
    height: 14,
    borderWidth: 2,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  locationDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  locationPoint: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginTop: -4,
  },
  // Settings icon
  gearOuter: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderRadius: 8,
  },
  gearInner: {
    position: "absolute",
    width: 6,
    height: 6,
    borderWidth: 2,
    borderRadius: 3,
  },
});

export default TabBar;
