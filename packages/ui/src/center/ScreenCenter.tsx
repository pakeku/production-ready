import React, { ReactNode } from "react";
import { Platform, View } from "react-native";

export function ScreenCenter({ children }: { children?: ReactNode }) {
  if (Platform.OS === "web") {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", width: "100%" }}>
        {children}
      </div>
    );
  }

  return (
    <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>{children}</View>
  );
}

export default ScreenCenter;
