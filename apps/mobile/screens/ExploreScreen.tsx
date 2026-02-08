import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useTheme } from "@repo/ui";

const { width } = Dimensions.get("window");

type Category = {
  id: string;
  title: string;
  icon: string;
};

const categories: Category[] = [
  { id: "all", title: "All", icon: "✨" },
  { id: "attractions", title: "Attractions", icon: "🏛️" },
  { id: "restaurants", title: "Restaurants", icon: "🍴" },
  { id: "shopping", title: "Shopping", icon: "🛍️" },
  { id: "nature", title: "Nature", icon: "🌴" },
  { id: "nightlife", title: "Nightlife", icon: "🎵" },
];

type Place = {
  id: string;
  title: string;
  category: string;
  icon: string;
  distance: string;
  rating: number;
  description: string;
  featured?: boolean;
};

const places: Place[] = [
  {
    id: "1",
    title: "Historic Downtown",
    category: "attractions",
    icon: "🏛️",
    distance: "0.5 mi",
    rating: 4.8,
    description: "Historic district with shops, restaurants & architecture",
    featured: true,
  },
  {
    id: "2",
    title: "Ocean Beach",
    category: "nature",
    icon: "🏖️",
    distance: "0.3 mi",
    rating: 4.9,
    description: "Pristine sandy beach with water sports",
    featured: true,
  },
  {
    id: "3",
    title: "The Seafood House",
    category: "restaurants",
    icon: "🦞",
    distance: "0.2 mi",
    rating: 4.7,
    description: "Fresh local seafood and ocean views",
  },
  {
    id: "4",
    title: "Art Museum",
    category: "attractions",
    icon: "🎨",
    distance: "0.8 mi",
    rating: 4.6,
    description: "Contemporary and classic art collections",
  },
  {
    id: "5",
    title: "Sunset Lounge",
    category: "nightlife",
    icon: "🌅",
    distance: "0.4 mi",
    rating: 4.5,
    description: "Cocktails with stunning sunset views",
  },
  {
    id: "6",
    title: "Luxury Mall",
    category: "shopping",
    icon: "🏬",
    distance: "1.2 mi",
    rating: 4.4,
    description: "Designer brands and local boutiques",
  },
  {
    id: "7",
    title: "Botanical Gardens",
    category: "nature",
    icon: "🌺",
    distance: "1.5 mi",
    rating: 4.8,
    description: "Tropical plants and scenic walking paths",
  },
  {
    id: "8",
    title: "Jazz Club",
    category: "nightlife",
    icon: "🎷",
    distance: "0.6 mi",
    rating: 4.6,
    description: "Live jazz music nightly",
  },
];

type ConciergeRecommendation = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
};

const conciergeRecommendations: ConciergeRecommendation[] = [
  { id: "1", title: "Sunset Cruise", subtitle: "Departs 5:30 PM", icon: "⛵" },
  { id: "2", title: "Food Tour", subtitle: "Local cuisine walk", icon: "🥘" },
  { id: "3", title: "Spa Day Trip", subtitle: "Mountain retreat", icon: "🧘" },
];

export function ExploreScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [activeCategory, setActiveCategory] = useState("all");

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundStrong: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
    accent: "#6750A4",
    gold: "#FFD700",
  };

  const filteredPlaces = places.filter(
    (place) => activeCategory === "all" || place.category === activeCategory
  );

  const featuredPlaces = places.filter((p) => p.featured);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return "★".repeat(fullStars) + (hasHalf ? "½" : "");
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        {/* Search Bar */}
        <TouchableOpacity
          style={[styles.searchBar, { backgroundColor: colors.backgroundStrong }]}
          activeOpacity={0.7}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={[styles.searchPlaceholder, { color: colors.subtle }]}>
            Search places, activities...
          </Text>
        </TouchableOpacity>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: activeCategory === category.id ? colors.accent : colors.backgroundStrong,
                },
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text
                style={[
                  styles.categoryText,
                  { color: activeCategory === category.id ? "#FFFFFF" : colors.text },
                ]}
              >
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Places */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Nearby Highlights</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.featuredContainer}
            contentContainerStyle={styles.featuredContent}
          >
            {featuredPlaces.map((place) => (
              <TouchableOpacity
                key={place.id}
                style={[styles.featuredCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                activeOpacity={0.7}
              >
                <View style={[styles.featuredImage, { backgroundColor: colors.accent }]}>
                  <Text style={styles.featuredEmoji}>{place.icon}</Text>
                </View>
                <View style={styles.featuredInfo}>
                  <Text style={[styles.featuredTitle, { color: colors.text }]}>{place.title}</Text>
                  <View style={styles.featuredMeta}>
                    <Text style={[styles.featuredRating, { color: colors.gold }]}>
                      {renderStars(place.rating)}
                    </Text>
                    <Text style={[styles.featuredDistance, { color: colors.subtle }]}>
                      {place.distance}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Concierge Picks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Concierge Picks</Text>
              <Text style={[styles.sectionSubtitle, { color: colors.subtle }]}>
                Curated experiences for you
              </Text>
            </View>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recommendationsContainer}
            contentContainerStyle={styles.recommendationsContent}
          >
            {conciergeRecommendations.map((rec) => (
              <TouchableOpacity
                key={rec.id}
                style={[styles.recommendationCard, { backgroundColor: colors.accent }]}
                activeOpacity={0.8}
              >
                <Text style={styles.recommendationEmoji}>{rec.icon}</Text>
                <Text style={styles.recommendationTitle}>{rec.title}</Text>
                <Text style={styles.recommendationSubtitle}>{rec.subtitle}</Text>
                <View style={styles.bookNowBadge}>
                  <Text style={styles.bookNowText}>Book Now</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Places */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>All Places</Text>
          <View style={[styles.placesCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {filteredPlaces.map((place, index) => (
              <TouchableOpacity
                key={place.id}
                style={[
                  styles.placeItem,
                  index < filteredPlaces.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                ]}
                activeOpacity={0.7}
              >
                <View style={[styles.placeIcon, { backgroundColor: colors.backgroundStrong }]}>
                  <Text style={styles.placeEmoji}>{place.icon}</Text>
                </View>
                <View style={styles.placeInfo}>
                  <Text style={[styles.placeTitle, { color: colors.text }]}>{place.title}</Text>
                  <Text style={[styles.placeDescription, { color: colors.subtle }]} numberOfLines={1}>
                    {place.description}
                  </Text>
                  <View style={styles.placeMeta}>
                    <Text style={[styles.placeRating, { color: colors.gold }]}>
                      ★ {place.rating}
                    </Text>
                    <Text style={[styles.placeDot, { color: colors.subtle }]}>•</Text>
                    <Text style={[styles.placeDistance, { color: colors.subtle }]}>
                      {place.distance}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.directionsButton, { backgroundColor: colors.backgroundStrong }]}>
                  <Text style={styles.directionsIcon}>📍</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Map Preview */}
        <TouchableOpacity
          style={[styles.mapPreview, { backgroundColor: colors.backgroundStrong }]}
          activeOpacity={0.8}
        >
          <View style={[styles.mapPlaceholder, { backgroundColor: colors.accent }]}>
            <Text style={styles.mapEmoji}>🗺️</Text>
          </View>
          <View style={styles.mapOverlay}>
            <Text style={[styles.mapTitle, { color: colors.text }]}>View Interactive Map</Text>
            <Text style={[styles.mapSubtitle, { color: colors.subtle }]}>
              Explore the area around the hotel
            </Text>
          </View>
        </TouchableOpacity>

        {/* Transportation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Getting Around</Text>
          <View style={styles.transportGrid}>
            <TouchableOpacity
              style={[styles.transportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={styles.transportEmoji}>🚕</Text>
              <Text style={[styles.transportTitle, { color: colors.text }]}>Taxi</Text>
              <Text style={[styles.transportSubtitle, { color: colors.subtle }]}>On demand</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.transportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={styles.transportEmoji}>🚐</Text>
              <Text style={[styles.transportTitle, { color: colors.text }]}>Shuttle</Text>
              <Text style={[styles.transportSubtitle, { color: colors.subtle }]}>Scheduled</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.transportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={styles.transportEmoji}>🚗</Text>
              <Text style={[styles.transportTitle, { color: colors.text }]}>Car Rental</Text>
              <Text style={[styles.transportSubtitle, { color: colors.subtle }]}>Available</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.transportCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              activeOpacity={0.7}
            >
              <Text style={styles.transportEmoji}>🚲</Text>
              <Text style={[styles.transportTitle, { color: colors.text }]}>Bikes</Text>
              <Text style={[styles.transportSubtitle, { color: colors.subtle }]}>Free</Text>
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    gap: 10,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchPlaceholder: {
    fontSize: 15,
  },
  categoriesContainer: {
    marginHorizontal: -20,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    marginRight: 8,
  },
  categoryIcon: {
    fontSize: 14,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: "500",
  },
  section: {
    gap: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  featuredContainer: {
    marginHorizontal: -20,
  },
  featuredContent: {
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 180,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    marginRight: 12,
  },
  featuredImage: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredEmoji: {
    fontSize: 40,
  },
  featuredInfo: {
    padding: 12,
    gap: 4,
  },
  featuredTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  featuredMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  featuredRating: {
    fontSize: 12,
  },
  featuredDistance: {
    fontSize: 12,
  },
  recommendationsContainer: {
    marginHorizontal: -20,
  },
  recommendationsContent: {
    paddingHorizontal: 20,
  },
  recommendationCard: {
    width: 140,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginRight: 12,
  },
  recommendationEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  recommendationTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  recommendationSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  bookNowBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 12,
  },
  bookNowText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  placesCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  placeItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  placeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  placeEmoji: {
    fontSize: 20,
  },
  placeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  placeTitle: {
    fontSize: 15,
    fontWeight: "500",
  },
  placeDescription: {
    fontSize: 12,
    marginTop: 2,
  },
  placeMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  placeRating: {
    fontSize: 12,
    fontWeight: "500",
  },
  placeDot: {
    fontSize: 8,
  },
  placeDistance: {
    fontSize: 12,
  },
  directionsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  directionsIcon: {
    fontSize: 16,
  },
  mapPreview: {
    borderRadius: 16,
    overflow: "hidden",
    height: 120,
  },
  mapPlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.3,
  },
  mapEmoji: {
    fontSize: 60,
  },
  mapOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mapTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  mapSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  transportGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  transportCard: {
    width: (width - 52) / 2,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 8,
  },
  transportEmoji: {
    fontSize: 28,
  },
  transportTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  transportSubtitle: {
    fontSize: 12,
  },
});

export default ExploreScreen;
