import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { useTheme } from "@repo/ui";

export type FABProps = {
  onPress: () => void;
};

export function FAB({ onPress }: FABProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const scale = useSharedValue(1);

  const colors = {
    accent: "#6750A4",
    accentDark: "#D0BCFF",
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity
        style={[
          styles.fab,
          { backgroundColor: isDark ? colors.accentDark : colors.accent },
        ]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <Text style={[styles.icon, { color: isDark ? "#1C1B1F" : "#FFFFFF" }]}>
          ✦
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 20,
    zIndex: 1000,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    fontSize: 24,
    fontWeight: "700",
  },
});
