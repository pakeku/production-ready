import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useTheme } from "@repo/ui";

type ServiceCategory = {
  id: string;
  title: string;
  icon: string;
  description: string;
};

const serviceCategories: ServiceCategory[] = [
  { id: "room-service", title: "Room Service", icon: "🍽️", description: "Order food & beverages" },
  { id: "housekeeping", title: "Housekeeping", icon: "🛏️", description: "Clean room, fresh towels" },
  { id: "laundry", title: "Laundry", icon: "👔", description: "Dry cleaning & pressing" },
  { id: "maintenance", title: "Maintenance", icon: "🔧", description: "Report issues" },
  { id: "concierge", title: "Concierge", icon: "🎩", description: "Reservations & requests" },
  { id: "transport", title: "Transport", icon: "🚗", description: "Taxi, airport shuttle" },
];

type QuickRequest = {
  id: string;
  title: string;
  icon: string;
  time: string;
};

const quickRequests: QuickRequest[] = [
  { id: "towels", title: "Extra Towels", icon: "🛁", time: "15 min" },
  { id: "pillows", title: "Extra Pillows", icon: "🛋️", time: "15 min" },
  { id: "ice", title: "Ice Bucket", icon: "🧊", time: "10 min" },
  { id: "water", title: "Bottled Water", icon: "💧", time: "10 min" },
  { id: "wake-up", title: "Wake-up Call", icon: "⏰", time: "Set time" },
  { id: "dnd", title: "Do Not Disturb", icon: "🔕", time: "Instant" },
];

type ActiveRequest = {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "completed";
  time: string;
  icon: string;
};

const activeRequests: ActiveRequest[] = [
  { id: "1", title: "Room Service - Breakfast", status: "in-progress", time: "Arriving in 10 min", icon: "🍳" },
  { id: "2", title: "Extra Towels", status: "pending", time: "Requested 5 min ago", icon: "🛁" },
];

export function ServiceScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
    accent: "#6750A4",
    success: "#4CAF50",
    warning: "#FF9800",
  };

  const getStatusColor = (status: ActiveRequest["status"]) => {
    switch (status) {
      case "pending": return colors.warning;
      case "in-progress": return colors.accent;
      case "completed": return colors.success;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Active Requests */}
        {activeRequests.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Requests</Text>
            <View style={styles.activeRequests}>
              {activeRequests.map((request) => (
                <View
                  key={request.id}
                  style={[styles.activeRequestCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                  <View style={[styles.statusDot, { backgroundColor: getStatusColor(request.status) }]} />
                  <View style={[styles.requestIcon, { backgroundColor: colors.backgroundStrong }]}>
                    <Text style={styles.requestEmoji}>{request.icon}</Text>
                  </View>
                  <View style={styles.requestInfo}>
                    <Text style={[styles.requestTitle, { color: colors.text }]}>{request.title}</Text>
                    <Text style={[styles.requestTime, { color: colors.subtle }]}>{request.time}</Text>
                  </View>
                  <TouchableOpacity style={styles.trackButton}>
                    <Text style={[styles.trackButtonText, { color: colors.accent }]}>Track</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Quick Requests */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Requests</Text>
          <View style={styles.quickRequestsGrid}>
            {quickRequests.map((request) => (
              <TouchableOpacity
                key={request.id}
                style={[styles.quickRequestCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
              >
                <Text style={styles.quickRequestEmoji}>{request.icon}</Text>
                <Text style={[styles.quickRequestTitle, { color: colors.text }]}>{request.title}</Text>
                <Text style={[styles.quickRequestTime, { color: colors.subtle }]}>{request.time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Service Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>All Services</Text>
          <View style={[styles.categoriesCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {serviceCategories.map((category, index) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  index < serviceCategories.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                ]}
                activeOpacity={0.7}
              >
                <View style={[styles.categoryIcon, { backgroundColor: colors.backgroundStrong }]}>
                  <Text style={styles.categoryEmoji}>{category.icon}</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.title}</Text>
                  <Text style={[styles.categoryDescription, { color: colors.subtle }]}>
                    {category.description}
                  </Text>
                </View>
                <View style={[styles.chevron, { borderColor: colors.subtle }]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Special Requests */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Special Request</Text>
          <View style={[styles.specialRequestCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <TextInput
              style={[styles.specialRequestInput, { color: colors.text }]}
              placeholder="Describe your request..."
              placeholderTextColor={colors.subtle}
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity style={[styles.submitButton, { backgroundColor: colors.accent }]}>
              <Text style={styles.submitButtonText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency */}
        <TouchableOpacity style={[styles.emergencyCard, { backgroundColor: "#B3261E" }]} activeOpacity={0.8}>
          <Text style={styles.emergencyIcon}>🚨</Text>
          <View style={styles.emergencyContent}>
            <Text style={styles.emergencyTitle}>Emergency Assistance</Text>
            <Text style={styles.emergencySubtitle}>24/7 immediate response</Text>
          </View>
          <View style={styles.emergencyChevron} />
        </TouchableOpacity>
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
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  activeRequests: {
    gap: 12,
  },
  activeRequestCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    position: "relative",
  },
  statusDot: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  requestIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  requestEmoji: {
    fontSize: 20,
  },
  requestInfo: {
    flex: 1,
    marginLeft: 12,
  },
  requestTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  requestTime: {
    fontSize: 13,
    marginTop: 2,
  },
  trackButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  trackButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  quickRequestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  quickRequestCard: {
    width: "30%",
    flexGrow: 1,
    minWidth: 100,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
  },
  quickRequestEmoji: {
    fontSize: 28,
  },
  quickRequestTitle: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  quickRequestTime: {
    fontSize: 11,
  },
  categoriesCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryEmoji: {
    fontSize: 20,
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  categoryDescription: {
    fontSize: 13,
    marginTop: 2,
  },
  chevron: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: "-45deg" }],
    marginLeft: 8,
  },
  specialRequestCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    gap: 12,
  },
  specialRequestInput: {
    fontSize: 15,
    minHeight: 80,
    textAlignVertical: "top",
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  emergencyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  emergencyIcon: {
    fontSize: 24,
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  emergencySubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    marginTop: 2,
  },
  emergencyChevron: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "-45deg" }],
  },
});

export default ServiceScreen;
