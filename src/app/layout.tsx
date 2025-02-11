'use client';

import { SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <title>Insights</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}
