import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { UiProvider } from "@repo/ui";
import { Header, TabBar, Sidebar } from "./components";
import {
  HomeScreen,
  ServiceScreen,
  AmenitiesScreen,
  ExploreScreen,
  SettingsScreen,
  NotificationsScreen,
} from "./screens";

type TabKey = "home" | "service" | "amenities" | "explore" | "settings";
type ScreenKey = TabKey | "notifications";

const tabs = [
  { key: "home" as const, label: "Home", icon: "home" as const },
  { key: "service" as const, label: "Service", icon: "service" as const },
  { key: "amenities" as const, label: "Amenities", icon: "amenities" as const },
  { key: "explore" as const, label: "Explore", icon: "explore" as const },
  { key: "settings" as const, label: "Settings", icon: "settings" as const },
];

const screenTitles: Record<ScreenKey, string> = {
  home: "Home",
  service: "Services",
  amenities: "Amenities",
  explore: "Explore",
  settings: "Settings",
  notifications: "Notifications",
};

function MainContent({ activeScreen }: { activeScreen: ScreenKey }) {
  switch (activeScreen) {
    case "home":
      return <HomeScreen />;
    case "service":
      return <ServiceScreen />;
    case "amenities":
      return <AmenitiesScreen />;
    case "explore":
      return <ExploreScreen />;
    case "settings":
      return <SettingsScreen />;
    case "notifications":
      return <NotificationsScreen />;
    default:
      return <HomeScreen />;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationCount] = useState(3);

  const handleTabPress = (key: string) => {
    setActiveTab(key as TabKey);
    setActiveScreen(key as ScreenKey);
  };

  const handleNotificationPress = () => {
    setActiveScreen("notifications");
  };

  const handleSidebarNavigate = (screen: string) => {
    if (["home", "service", "amenities", "explore", "settings"].includes(screen)) {
      setActiveTab(screen as TabKey);
      setActiveScreen(screen as ScreenKey);
    }
  };

  return (
    <UiProvider>
      <View style={styles.container}>
        <Header
          title={screenTitles[activeScreen]}
          onMenuPress={() => setSidebarOpen(true)}
          notificationCount={notificationCount}
          onNotificationPress={handleNotificationPress}
        />

        <View style={styles.content}>
          <MainContent activeScreen={activeScreen} />
        </View>

        <TabBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          userName="John Doe"
          userEmail="john.doe@example.com"
          onNavigate={handleSidebarNavigate}
        />
      </View>
    </UiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
