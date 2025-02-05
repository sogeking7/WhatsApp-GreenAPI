import React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SideNavbar } from "@/components/side-navbar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen h-full bg-neutral-900">
      <div className="container min-h-screen max-w-screen-xl mx-auto h-full w-full grid grid-cols-[70px_1fr_2fr]">
        <nav className="w-[70px] h-full bg-white py-6">
          <SideNavbar />
        </nav>
        <aside className="w-full h-full bg-gray-100 py-6">
          <AppSidebar />
        </aside>
        <div className="w-full h-full bg-white">{children}</div>
      </div>
    </div>
  );
}
