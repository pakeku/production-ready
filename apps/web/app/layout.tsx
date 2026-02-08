import { ReactNode } from "react";
import { UiProvider } from "@repo/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Self-Service | Smart Hospitality Software",
  description:
    "Transform your hotel guest experience with Self-Service. Mobile check-in, room service, amenities booking, and local exploration - all in one app.",
  keywords: "hotel software, hospitality, guest experience, mobile check-in, room service app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}
