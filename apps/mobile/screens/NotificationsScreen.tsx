import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@repo/ui";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "transaction" | "promo" | "alert" | "system";
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Payment Successful",
    message: "Your payment of $45.00 to Netflix was successful.",
    time: "2 min ago",
    read: false,
    type: "transaction",
  },
  {
    id: "2",
    title: "Special Offer! 🎉",
    message: "Get 20% cashback on your next transfer. Valid until Feb 10.",
    time: "1 hour ago",
    read: false,
    type: "promo",
  },
  {
    id: "3",
    title: "Security Alert",
    message: "New login detected from iPhone 15 Pro. Was this you?",
    time: "3 hours ago",
    read: true,
    type: "alert",
  },
  {
    id: "4",
    title: "Money Received",
    message: "You received $500.00 from Jane Smith.",
    time: "Yesterday",
    read: true,
    type: "transaction",
  },
  {
    id: "5",
    title: "App Update Available",
    message: "Version 2.0 is now available with exciting new features!",
    time: "2 days ago",
    read: true,
    type: "system",
  },
  {
    id: "6",
    title: "Weekly Summary",
    message: "You spent $234.50 this week. Tap to see your spending breakdown.",
    time: "3 days ago",
    read: true,
    type: "system",
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "transaction":
      return "💸";
    case "promo":
      return "🎁";
    case "alert":
      return "⚠️";
    case "system":
      return "📢";
  }
};

const getNotificationColor = (type: Notification["type"]) => {
  switch (type) {
    case "transaction":
      return "#4CAF50";
    case "promo":
      return "#FF9800";
    case "alert":
      return "#FF3B30";
    case "system":
      return "#6750A4";
  }
};

export function NotificationsScreen() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [notifications, setNotifications] = useState(mockNotifications);

  const colors = {
    background: isDark ? "#1C1B1F" : "#FFFBFE",
    backgroundHover: isDark ? "#2B2930" : "#F3EDF7",
    text: isDark ? "#E6E1E5" : "#1C1B1F",
    subtle: isDark ? "#938F99" : "#79747E",
    border: isDark ? "#49454F" : "#CAC4D0",
    card: isDark ? "#2B2930" : "#FFFFFF",
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header Actions */}
      <View style={styles.headerActions}>
        <Text style={[styles.headerText, { color: colors.subtle }]}>
          {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
        </Text>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={[styles.markAllText, { color: colors.text }]}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔔</Text>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No notifications yet</Text>
              <Text style={[styles.emptySubtitle, { color: colors.subtle }]}>
                We'll notify you when something important happens
              </Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  {
                    backgroundColor: notification.read ? colors.background : colors.backgroundHover,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => markAsRead(notification.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.notificationIcon,
                    { backgroundColor: getNotificationColor(notification.type) + "20" },
                  ]}
                >
                  <Text style={styles.notificationEmoji}>{getNotificationIcon(notification.type)}</Text>
                </View>
                <View style={styles.notificationContent}>
                  <View style={styles.notificationHeader}>
                    <Text
                      style={[
                        styles.notificationTitle,
                        { color: colors.text, fontWeight: notification.read ? "500" : "700" },
                      ]}
                      numberOfLines={1}
                    >
                      {notification.title}
                    </Text>
                    <View style={styles.notificationMeta}>
                      <Text style={[styles.notificationTime, { color: colors.subtle }]}>{notification.time}</Text>
                      {!notification.read && (
                        <View style={[styles.unreadDot, { backgroundColor: getNotificationColor(notification.type) }]} />
                      )}
                    </View>
                  </View>
                  <Text style={[styles.notificationMessage, { color: colors.subtle }]} numberOfLines={2}>
                    {notification.message}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 0,
  },
  headerText: {
    fontSize: 14,
  },
  markAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
    gap: 16,
  },
  emptyIcon: {
    fontSize: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
  },
  notificationCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  notificationIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationEmoji: {
    fontSize: 20,
  },
  notificationContent: {
    flex: 1,
    gap: 4,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  notificationTitle: {
    fontSize: 15,
    flex: 1,
  },
  notificationMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  notificationTime: {
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  notificationMessage: {
    fontSize: 14,
  },
});

export default NotificationsScreen;
