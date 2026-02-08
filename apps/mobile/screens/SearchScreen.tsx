import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@repo/ui";

type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  category: string;
};

const popularSearches = ["Transfer", "Bill Payment", "Investment", "Insurance", "Loan"];

const searchResults: SearchResult[] = [
  { id: "1", title: "Bank Transfer", subtitle: "Send money to bank accounts", icon: "🏦", category: "Payments" },
  { id: "2", title: "Pay Bills", subtitle: "Electricity, Water, Internet", icon: "📄", category: "Payments" },
  { id: "3", title: "Mobile Top Up", subtitle: "Prepaid & Postpaid", icon: "📱", category: "Services" },
  { id: "4", title: "Savings Account", subtitle: "Earn up to 5% interest", icon: "💰", category: "Banking" },
  { id: "5", title: "Investment", subtitle: "Stocks, Mutual Funds, ETFs", icon: "📈", category: "Investment" },
  { id: "6", title: "Insurance", subtitle: "Life, Health, Vehicle", icon: "🛡️", category: "Insurance" },
];

export function SearchScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundHover: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
  };

  const filteredResults = searchQuery
    ? searchResults.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchResults;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={[styles.searchInputWrapper, { backgroundColor: colors.backgroundHover }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search services, payments..."
            placeholderTextColor={colors.subtle}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Text style={[styles.clearButton, { color: colors.subtle }]}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {/* Popular Searches */}
          {!searchQuery && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Searches</Text>
              <View style={styles.tagsContainer}>
                {popularSearches.map((term) => (
                  <TouchableOpacity
                    key={term}
                    style={[styles.tag, { backgroundColor: colors.backgroundHover }]}
                    onPress={() => setSearchQuery(term)}
                  >
                    <Text style={[styles.tagText, { color: colors.text }]}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Results */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {searchQuery ? `Results for "${searchQuery}"` : "All Services"}
            </Text>

            {filteredResults.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🔍</Text>
                <Text style={[styles.emptyText, { color: colors.subtle }]}>
                  No results found for "{searchQuery}"
                </Text>
              </View>
            ) : (
              <View style={styles.resultsList}>
                {filteredResults.map((result) => (
                  <TouchableOpacity
                    key={result.id}
                    style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.resultIcon, { backgroundColor: colors.backgroundHover }]}>
                      <Text style={styles.resultEmoji}>{result.icon}</Text>
                    </View>
                    <View style={styles.resultInfo}>
                      <Text style={[styles.resultTitle, { color: colors.text }]}>{result.title}</Text>
                      <Text style={[styles.resultSubtitle, { color: colors.subtle }]}>{result.subtitle}</Text>
                    </View>
                    <Text style={[styles.resultCategory, { color: colors.subtle }]}>{result.category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
    paddingBottom: 0,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  searchIcon: {
    fontSize: 18,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
  },
  clearButton: {
    fontSize: 16,
    padding: 4,
  },
  scrollView: {
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
    fontSize: 16,
    fontWeight: "600",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  resultsList: {
    gap: 8,
  },
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  resultEmoji: {
    fontSize: 24,
  },
  resultInfo: {
    flex: 1,
    gap: 2,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  resultSubtitle: {
    fontSize: 13,
  },
  resultCategory: {
    fontSize: 12,
  },
});

export default SearchScreen;
