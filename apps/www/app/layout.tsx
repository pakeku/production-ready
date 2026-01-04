import { ReactNode } from "react";
import { UiProvider } from "@repo/ui";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}
