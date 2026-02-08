import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { ClerkProvider, ClerkLoaded, useAuth, useUser } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { UiProvider } from "@repo/ui";
import { Header, TabBar, Sidebar, FAB, AIAssistant } from "./components";
import {
  HomeScreen,
  ServiceScreen,
  AmenitiesScreen,
  ExploreScreen,
  SettingsScreen,
  NotificationsScreen,
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
} from "./screens";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

// Token cache for Clerk
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      // Handle error silently
    }
  },
};

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

function AuthScreen() {
  const [authView, setAuthView] = useState<"signin" | "signup" | "forgot">("signin");

  if (authView === "signup") {
    return <SignUpScreen onSignInPress={() => setAuthView("signin")} />;
  }

  if (authView === "forgot") {
    return <ForgotPasswordScreen onBackToSignIn={() => setAuthView("signin")} />;
  }

  return (
    <SignInScreen
      onSignUpPress={() => setAuthView("signup")}
      onForgotPasswordPress={() => setAuthView("forgot")}
    />
  );
}

function AuthenticatedApp() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [notificationCount] = useState(3);

  const userName = user?.fullName || user?.firstName || "Guest";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "guest@example.com";

  const handleTabPress = (key: string) => {
    setActiveTab(key as TabKey);
    setActiveScreen(key as ScreenKey);
  };

  const handleNotificationPress = () => {
    setActiveScreen("notifications");
  };

  const handleSidebarNavigate = (screen: string) => {
    if (screen === "logout") {
      signOut();
      return;
    }
    if (["home", "service", "amenities", "explore", "settings"].includes(screen)) {
      setActiveTab(screen as TabKey);
      setActiveScreen(screen as ScreenKey);
    }
  };

  return (
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
        userName={userName}
        userEmail={userEmail}
        onNavigate={handleSidebarNavigate}
      />

      <FAB onPress={() => setAiAssistantOpen(true)} />

      <AIAssistant
        visible={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />
    </View>
  );
}

function AppContent() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <AuthScreen />;
  }

  return <AuthenticatedApp />;
}

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <ClerkLoaded>
        <UiProvider>
          <AppContent />
        </UiProvider>
      </ClerkLoaded>
    </ClerkProvider>
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
