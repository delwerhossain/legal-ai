"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat-sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar for Mobile & Desktop */}
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Chat Area */}
      <main className="flex-1">
        {/* Mobile Menu Button */}
        <div className="p-4 border-b md:hidden flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </Button>
          <h2 className="text-lg font-semibold">Chat</h2>
          <div className="w-6" />
        </div>

        {children}
      </main>
    </div>
  );
}
