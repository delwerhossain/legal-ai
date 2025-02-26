"use client";

import { Plus, MessageSquare, Scale, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatStore } from '@/lib/chat-store';
import { cn } from '@/lib/utils';

export function ChatSidebar() {
  const { sessions, currentSessionId, createSession, switchSession, deleteSession } = useChatStore();

  return (
    <div className="w-[300px] h-screen bg-muted/30 border-r flex flex-col">
      <div className="p-4 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => createSession('general')}
        >
          <Plus className="mr-2 h-4 w-4" />
          New Chat
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => createSession('lawyer')}
        >
          <Scale className="mr-2 h-4 w-4" />
          New Lawyer Chat
        </Button>
      </div>

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
                {session.type === 'lawyer' ? (
                  <Scale className="mr-2 h-4 w-4" />
                ) : (
                  <MessageSquare className="mr-2 h-4 w-4" />
                )}
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
  );
}