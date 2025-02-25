"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Paperclip, Send, X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { useChatStore } from "@/lib/chat-store";
import { Message } from "@/types/chat";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

const translations = {
  en: {
    placeholder: "Type a message... (Press '/' to focus)",
    uploadFile: "Upload File",
    startRecording: "Start Voice Recording",
    stopRecording: "Stop Voice Recording",
    send: "Send Message",
    clearChat: "Clear Chat",
    anonymousMode: "Anonymous Mode",
  },
  bn: {
    placeholder: "একটি বার্তা টাইপ করুন... ('/' চাপুন ফোকাস করতে)",
    uploadFile: "ফাইল আপলোড করুন",
    startRecording: "ভয়েস রেকর্ডিং শুরু করুন",
    stopRecording: "ভয়েস রেকর্ডিং বন্ধ করুন",
    send: "বার্তা পাঠান",
    clearChat: "চ্যাট মুছুন",
    anonymousMode: "বেনামী মোড",
  },
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const isAnonymous = searchParams.get("anonymous") === "true";
  const { messages, addMessage, clearMessages, updateLastMessage } =
    useChatStore();
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    addMessage(newMessage);
    setInput("");

    // Initialize an empty AI response message for real-time updates
    const aiMessageId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: aiMessageId,
      content: "", // Empty initially, updated in real time
      role: "assistant",
      timestamp: new Date(),
    };

    addMessage(loadingMessage);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/chat/ai`.replace(/\/+$/, ""),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: input }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });

        const match = chunkText.match(/data:\s*(.*)/);
        if (match) {
          const parsedData = JSON.parse(match[1]);
          accumulatedText += parsedData.text;

          // ✅ **Update AI response smoothly without overwriting**
          updateLastMessage(accumulatedText); // Only if updateLastMessage accepts an ID
        }
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);

      updateLastMessage(
        "⚠️ AI is currently unavailable. Please try again later."
      );
    }
  };

  const toggleVoiceRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="container mx-auto px-4 chat-container">
      <Card className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            {isAnonymous && (
              <span className="text-sm text-muted-foreground">
                {t.anonymousMode}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearMessages}
            className="text-destructive"
            title={t.clearChat}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 pr-4 chat-messages" ref={scrollAreaRef}>
          <div className="space-y-4 p-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "message-bubble",
                  message.role === "user" ? "user-message" : "assistant-message"
                )}
              >
                <p className={language === "bn" ? "bangla" : ""}>
                  {message.content === "...." ? (
                    <span className="loading-animation">.</span>
                  ) : (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  )}
                </p>
                <span className="mt-1 text-xs opacity-70">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>

        <style jsx>{`
          .loading-animation {
            display: inline-block;
            font-weight: bold;
            animation: dots 1.5s steps(4, end) infinite;
          }

          @keyframes dots {
            0% {
              content: ".";
            }
            25% {
              content: "..";
            }
            50% {
              content: "...";
            }
            75% {
              content: "....";
            }
            100% {
              content: ".";
            }
          }
        `}</style>

        <div className="p-4 border-t bg-accent/50">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn("hover-scale", isRecording && "text-destructive")}
              onClick={toggleVoiceRecording}
              title={isRecording ? t.stopRecording : t.startRecording}
            >
              {isRecording ? (
                <X className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>

            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t.placeholder}
              className={cn(
                "flex-1 bg-background",
                language === "bn" && "bangla"
              )}
            />

            <Button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="hover-scale"
              title={t.send}
            >
              {loading ? (
                <span className="animate-pulse">...</span>
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
        <div className="p-2 text-xs text-center text-muted-foreground border-t">
          <p>
            This AI provides general legal information, not legal advice. Consult a qualified attorney for legal matters.
          </p>
          <Link href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>
        </div>
      </Card>
    </div>
  );
}
