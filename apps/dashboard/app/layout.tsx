import { ReactNode } from "react";
import { UiProvider } from "@repo/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Service Dashboard | Hotel Management",
  description: "Manage your hotel operations with the Self-Service admin dashboard.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}
