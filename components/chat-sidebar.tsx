"use client";

import { Plus, MessageSquare, Scale, Trash2, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/lib/chat-store";
import { cn } from "@/lib/utils";

export function ChatSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { sessions, currentSessionId, createSession, switchSession, deleteSession } = useChatStore();

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black bg-opacity-50 z-50 md:relative md:bg-transparent md:border-r",
        isOpen ? "block" : "hidden md:block"
      )}
      onClick={onClose} // Close sidebar when clicking outside
    >
      <div
        className="w-[300px] h-full md:bg-muted/30 bg-gray-200 dark:bg-gray-800 border-r flex flex-col md:block absolute left-0 top-0 md:relative"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing sidebar
      >
        {/* Close Button for Mobile */}
        <div className="p-4 flex justify-between items-center md:hidden">
          <h2 className="text-lg font-bold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Chat Options */}
        <div className="p-4 space-y-2">
          <Button variant="outline" className="w-full justify-start" onClick={() => createSession("general")}>
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
          <Button variant="outline" className="w-full justify-start" onClick={() => createSession("lawyer")}>
            <Scale className="mr-2 h-4 w-4" />
            New Lawyer Chat
          </Button>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 cursor-pointer",
                  currentSessionId === session.id && "bg-accent"
                )}
                onClick={() => switchSession(session.id)}
              >
                <div className="flex items-center">
                  {session.type === "lawyer" ? <Scale className="mr-2 h-4 w-4" /> : <MessageSquare className="mr-2 h-4 w-4" />}
                  <span className="truncate">{session.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
