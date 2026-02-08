import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@repo/ui";

const { width } = Dimensions.get("window");

type Amenity = {
  id: string;
  title: string;
  icon: string;
  location: string;
  hours: string;
  status: "open" | "closed" | "reservation-required";
  description: string;
};

const amenities: Amenity[] = [
  {
    id: "pool",
    title: "Infinity Pool",
    icon: "🏊",
    location: "Rooftop, Level 15",
    hours: "6:00 AM - 10:00 PM",
    status: "open",
    description: "Stunning ocean views with heated pool",
  },
  {
    id: "spa",
    title: "Serenity Spa",
    icon: "💆",
    location: "Level 3",
    hours: "9:00 AM - 9:00 PM",
    status: "reservation-required",
    description: "Full-service spa with massage and treatments",
  },
  {
    id: "gym",
    title: "Fitness Center",
    icon: "🏋️",
    location: "Level 2",
    hours: "24 Hours",
    status: "open",
    description: "State-of-the-art equipment and classes",
  },
  {
    id: "restaurant",
    title: "The Grand Kitchen",
    icon: "🍽️",
    location: "Ground Floor",
    hours: "6:30 AM - 11:00 PM",
    status: "open",
    description: "International cuisine and fine dining",
  },
  {
    id: "bar",
    title: "Sky Bar",
    icon: "🍸",
    location: "Rooftop, Level 15",
    hours: "5:00 PM - 1:00 AM",
    status: "open",
    description: "Cocktails with panoramic city views",
  },
  {
    id: "business",
    title: "Business Center",
    icon: "💼",
    location: "Level 1",
    hours: "24 Hours",
    status: "open",
    description: "Meeting rooms and workstations",
  },
  {
    id: "kids",
    title: "Kids Club",
    icon: "🎠",
    location: "Level 2",
    hours: "9:00 AM - 6:00 PM",
    status: "open",
    description: "Supervised activities for children",
  },
  {
    id: "tennis",
    title: "Tennis Court",
    icon: "🎾",
    location: "Level 4 Outdoor",
    hours: "7:00 AM - 9:00 PM",
    status: "reservation-required",
    description: "Professional court with equipment rental",
  },
];

type DiningOption = {
  id: string;
  title: string;
  cuisine: string;
  icon: string;
  hours: string;
  priceLevel: string;
};

const diningOptions: DiningOption[] = [
  { id: "1", title: "The Grand Kitchen", cuisine: "International", icon: "🍽️", hours: "6:30 AM - 11 PM", priceLevel: "$$$" },
  { id: "2", title: "Sakura", cuisine: "Japanese", icon: "🍣", hours: "12 PM - 10 PM", priceLevel: "$$$$" },
  { id: "3", title: "La Terrazza", cuisine: "Italian", icon: "🍝", hours: "6 PM - 11 PM", priceLevel: "$$$" },
  { id: "4", title: "Pool Bar & Grill", cuisine: "Light Bites", icon: "🍔", hours: "11 AM - 7 PM", priceLevel: "$$" },
];

export function AmenitiesScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeFilter, setActiveFilter] = useState<"all" | "open" | "dining">("all");

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

  const getStatusColor = (status: Amenity["status"]) => {
    switch (status) {
      case "open": return colors.success;
      case "closed": return "#B3261E";
      case "reservation-required": return colors.warning;
    }
  };

  const getStatusText = (status: Amenity["status"]) => {
    switch (status) {
      case "open": return "Open Now";
      case "closed": return "Closed";
      case "reservation-required": return "Book Required";
    }
  };

  const filters = [
    { key: "all" as const, label: "All" },
    { key: "open" as const, label: "Open Now" },
    { key: "dining" as const, label: "Dining" },
  ];

  const filteredAmenities = amenities.filter((amenity) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "open") return amenity.status === "open";
    if (activeFilter === "dining") return ["restaurant", "bar"].includes(amenity.id);
    return true;
  });

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterRow}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: activeFilter === filter.key ? colors.accent : colors.backgroundStrong,
                    },
                  ]}
                  onPress={() => setActiveFilter(filter.key)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      { color: activeFilter === filter.key ? "#FFFFFF" : colors.text },
                    ]}
                  >
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Featured Amenity */}
        <TouchableOpacity
          style={[styles.featuredCard, { backgroundColor: colors.accent }]}
          activeOpacity={0.8}
        >
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>✨ Featured</Text>
          </View>
          <Text style={styles.featuredEmoji}>🏊</Text>
          <Text style={styles.featuredTitle}>Rooftop Infinity Pool</Text>
          <Text style={styles.featuredDescription}>Enjoy breathtaking ocean views from our heated pool</Text>
          <View style={styles.featuredFooter}>
            <View style={styles.featuredStatus}>
              <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
              <Text style={styles.featuredStatusText}>Open Now</Text>
            </View>
            <Text style={styles.featuredHours}>Until 10:00 PM</Text>
          </View>
        </TouchableOpacity>

        {/* Amenities Grid */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Hotel Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {filteredAmenities.map((amenity) => (
              <TouchableOpacity
                key={amenity.id}
                style={[styles.amenityCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
              >
                <View style={styles.amenityHeader}>
                  <View style={[styles.amenityIcon, { backgroundColor: colors.backgroundStrong }]}>
                    <Text style={styles.amenityEmoji}>{amenity.icon}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(amenity.status) + "20" }]}>
                    <Text style={[styles.statusBadgeText, { color: getStatusColor(amenity.status) }]}>
                      {getStatusText(amenity.status)}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.amenityTitle, { color: colors.text }]}>{amenity.title}</Text>
                <Text style={[styles.amenityLocation, { color: colors.subtle }]}>{amenity.location}</Text>
                <Text style={[styles.amenityHours, { color: colors.subtle }]}>🕐 {amenity.hours}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Dining Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Dining</Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.accent }]}>View Menu</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.diningCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {diningOptions.map((restaurant, index) => (
              <TouchableOpacity
                key={restaurant.id}
                style={[
                  styles.diningItem,
                  index < diningOptions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                ]}
                activeOpacity={0.7}
              >
                <View style={[styles.diningIcon, { backgroundColor: colors.backgroundStrong }]}>
                  <Text style={styles.diningEmoji}>{restaurant.icon}</Text>
                </View>
                <View style={styles.diningInfo}>
                  <Text style={[styles.diningTitle, { color: colors.text }]}>{restaurant.title}</Text>
                  <Text style={[styles.diningCuisine, { color: colors.subtle }]}>
                    {restaurant.cuisine} • {restaurant.hours}
                  </Text>
                </View>
                <View style={styles.diningRight}>
                  <Text style={[styles.diningPrice, { color: colors.text }]}>{restaurant.priceLevel}</Text>
                  <TouchableOpacity style={[styles.reserveButton, { borderColor: colors.accent }]}>
                    <Text style={[styles.reserveButtonText, { color: colors.accent }]}>Book</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Map Card */}
        <TouchableOpacity
          style={[styles.mapCard, { backgroundColor: colors.backgroundStrong }]}
          activeOpacity={0.8}
        >
          <Text style={styles.mapIcon}>🗺️</Text>
          <View style={styles.mapContent}>
            <Text style={[styles.mapTitle, { color: colors.text }]}>Hotel Map</Text>
            <Text style={[styles.mapSubtitle, { color: colors.subtle }]}>
              Navigate the property
            </Text>
          </View>
          <View style={[styles.chevron, { borderColor: colors.subtle }]} />
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
  filterContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
  },
  featuredCard: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  featuredBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  featuredBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  featuredEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  featuredTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  featuredDescription: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
  featuredFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },
  featuredStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  featuredStatusText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  featuredHours: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
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
  amenitiesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  amenityCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 8,
  },
  amenityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  amenityIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  amenityEmoji: {
    fontSize: 22,
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 9,
    fontWeight: "600",
  },
  amenityTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
  amenityLocation: {
    fontSize: 12,
  },
  amenityHours: {
    fontSize: 11,
    marginTop: 4,
  },
  diningCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  diningItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  diningIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  diningEmoji: {
    fontSize: 20,
  },
  diningInfo: {
    flex: 1,
    marginLeft: 12,
  },
  diningTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  diningCuisine: {
    fontSize: 12,
    marginTop: 2,
  },
  diningRight: {
    alignItems: "flex-end",
    gap: 6,
  },
  diningPrice: {
    fontSize: 12,
    fontWeight: "500",
  },
  reserveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
  },
  reserveButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
  mapCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  mapIcon: {
    fontSize: 28,
  },
  mapContent: {
    flex: 1,
  },
  mapTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  mapSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  chevron: {
    width: 8,
    height: 8,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: "-45deg" }],
  },
});

export default AmenitiesScreen;
