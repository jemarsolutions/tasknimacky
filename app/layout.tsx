import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Task Ni Macky",
  description:
    "Task Ni Macky is my personal task management app designed to help me stay organized, focused, and productive. It’s where I list all my projects, daily tasks, deadlines, and anything important I need to remember. Everything is arranged in a simple and clear way so I can easily track what I need to do and what I’ve already finished. This app is built to help me manage my time better and stay consistent with my goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${orbitron.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
