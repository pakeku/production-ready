import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Button, useTheme } from "@repo/ui";

type QuickAction = {
  title: string;
  icon: string;
  color: string;
};

const quickActions: QuickAction[] = [
  { title: "Room Service", icon: "🍽️", color: "#6750A4" },
  { title: "Housekeeping", icon: "🛏️", color: "#625B71" },
  { title: "Concierge", icon: "🛎️", color: "#7D5260" },
  { title: "Checkout", icon: "🔑", color: "#49454F" },
];

type UpcomingItem = {
  title: string;
  description: string;
  time: string;
  icon: string;
};

const upcomingItems: UpcomingItem[] = [
  { title: "Spa Appointment", description: "Deep Tissue Massage", time: "2:00 PM", icon: "💆" },
  { title: "Restaurant Reservation", description: "The Grand Dining Room", time: "7:30 PM", icon: "🍷" },
  { title: "Pool Access", description: "Rooftop Infinity Pool", time: "Available Now", icon: "🏊" },
];

export function HomeScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
    accent: "#6750A4",
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Welcome Card */}
        <View style={[styles.card, styles.welcomeCard, { backgroundColor: colors.accent }]}>
          <View style={styles.welcomeContent}>
            <Text style={styles.welcomeLabel}>Welcome to</Text>
            <Text style={styles.hotelName}>The Grand Hotel</Text>
            <View style={styles.roomInfo}>
              <View style={styles.roomBadge}>
                <Text style={styles.roomBadgeText}>Room 412</Text>
              </View>
              <Text style={styles.floorText}>4th Floor • Ocean View</Text>
            </View>
          </View>
          <View style={styles.checkoutInfo}>
            <Text style={styles.checkoutLabel}>Checkout</Text>
            <Text style={styles.checkoutDate}>Feb 10, 2026</Text>
            <Text style={styles.checkoutTime}>11:00 AM</Text>
          </View>
        </View>

        {/* Guest Info */}
        <View style={[styles.guestCard, { backgroundColor: colors.backgroundStrong }]}>
          <View style={[styles.guestAvatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.guestInitials}>JD</Text>
          </View>
          <View style={styles.guestInfo}>
            <Text style={[styles.guestName, { color: colors.text }]}>John Doe</Text>
            <Text style={[styles.guestStatus, { color: colors.subtle }]}>Gold Member • 2,450 Points</Text>
          </View>
          <View style={[styles.wifiCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={styles.wifiIcon}>📶</Text>
            <View>
              <Text style={[styles.wifiLabel, { color: colors.subtle }]}>WiFi</Text>
              <Text style={[styles.wifiName, { color: colors.text }]}>GrandHotel_Guest</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Services</Text>
          <View style={styles.quickActionsRow}>
            {quickActions.map((action) => (
              <TouchableOpacity key={action.title} style={styles.quickAction} activeOpacity={0.7}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Text style={styles.quickActionEmoji}>{action.icon}</Text>
                </View>
                <Text style={[styles.quickActionLabel, { color: colors.subtle }]}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Today's Schedule */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Schedule</Text>
            <Text style={[styles.seeAll, { color: colors.accent }]}>View All</Text>
          </View>

          <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {upcomingItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.scheduleItem,
                  index < upcomingItems.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                ]}
                activeOpacity={0.7}
              >
                <View style={[styles.scheduleIcon, { backgroundColor: colors.backgroundStrong }]}>
                  <Text style={styles.scheduleEmoji}>{item.icon}</Text>
                </View>
                <View style={styles.scheduleInfo}>
                  <Text style={[styles.scheduleTitle, { color: colors.text }]}>{item.title}</Text>
                  <Text style={[styles.scheduleDescription, { color: colors.subtle }]}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.scheduleTime}>
                  <Text style={[styles.scheduleTimeText, { color: colors.accent }]}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hotel Highlights */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
            <TouchableOpacity style={[styles.featuredCard, { backgroundColor: "#7D5260" }]}>
              <Text style={styles.featuredEmoji}>🍸</Text>
              <Text style={styles.featuredTitle}>Happy Hour</Text>
              <Text style={styles.featuredSubtitle}>5-7 PM at Sky Bar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.featuredCard, { backgroundColor: "#6750A4" }]}>
              <Text style={styles.featuredEmoji}>💆</Text>
              <Text style={styles.featuredTitle}>Spa Special</Text>
              <Text style={styles.featuredSubtitle}>20% off today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.featuredCard, { backgroundColor: "#625B71" }]}>
              <Text style={styles.featuredEmoji}>🎭</Text>
              <Text style={styles.featuredTitle}>Live Jazz</Text>
              <Text style={styles.featuredSubtitle}>Tonight 8 PM</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Need Help */}
        <View style={[styles.helpCard, { backgroundColor: colors.backgroundStrong }]}>
          <Text style={styles.helpEmoji}>🛎️</Text>
          <View style={styles.helpContent}>
            <Text style={[styles.helpTitle, { color: colors.text }]}>Need Assistance?</Text>
            <Text style={[styles.helpSubtitle, { color: colors.subtle }]}>
              Our concierge is available 24/7
            </Text>
          </View>
          <TouchableOpacity style={[styles.helpButton, { backgroundColor: colors.accent }]}>
            <Text style={styles.helpButtonText}>Call</Text>
          </TouchableOpacity>
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
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "transparent",
  },
  welcomeCard: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeContent: {
    flex: 1,
  },
  welcomeLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  hotelName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
  },
  roomInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  roomBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  roomBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  floorText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
  },
  checkoutInfo: {
    alignItems: "flex-end",
  },
  checkoutLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  checkoutDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginTop: 2,
  },
  checkoutTime: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  guestCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  guestAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  guestInitials: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  guestInfo: {
    flex: 1,
  },
  guestName: {
    fontSize: 16,
    fontWeight: "600",
  },
  guestStatus: {
    fontSize: 13,
    marginTop: 2,
  },
  wifiCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  wifiIcon: {
    fontSize: 18,
  },
  wifiLabel: {
    fontSize: 10,
  },
  wifiName: {
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "500",
  },
  quickActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickAction: {
    alignItems: "center",
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionLabel: {
    fontSize: 11,
    textAlign: "center",
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  scheduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  scheduleEmoji: {
    fontSize: 20,
  },
  scheduleInfo: {
    flex: 1,
    marginLeft: 12,
  },
  scheduleTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  scheduleDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  scheduleTime: {
    paddingLeft: 12,
  },
  scheduleTimeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  featuredScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    alignItems: "center",
  },
  featuredEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  featuredTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  featuredSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  helpCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  helpEmoji: {
    fontSize: 28,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  helpSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  helpButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  helpButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default HomeScreen;
