"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, X, Trash2, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { useChatStore } from "@/lib/chat-store";
import { Message } from "@/types/chat";
import { CodeBlock } from "@/components/code-block";
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
    welcome: "Welcome to Legal Chat Assistant",
    startNewChat: "Start a new chat or select an existing conversation",
    legalDisclaimer:
      "This AI provides general legal information, not legal advice. Consult a qualified attorney for legal matters.",
    privacyPolicy: "Privacy Policy",
    errors: {
      timeout: "⚠️ Request timed out. Please try again.",
      network: "⚠️ Network error. Please check your connection.",
      server: "⚠️ Server error. Please try again later.",
      unknown: "⚠️ An unexpected error occurred. Please try again.",
    },
  },
  bn: {
    placeholder: "একটি বার্তা টাইপ করুন... ('/' চাপুন ফোকাস করতে)",
    uploadFile: "ফাইল আপলোড করুন",
    startRecording: "ভয়েস রেকর্ডিং শুরু করুন",
    stopRecording: "ভয়েস রেকর্ডিং বন্ধ করুন",
    send: "বার্তা পাঠান",
    clearChat: "চ্যাট মুছুন",
    welcome: "লিগ্যাল চ্যাট অ্যাসিস্ট্যান্টে স্বাগতম",
    startNewChat: "নতুন চ্যাট শুরু করুন অথবা বিদ্যমান কথোপকথন নির্বাচন করুন",
    legalDisclaimer:
      "এই AI সাধারণ আইনি তথ্য প্রদান করে, আইনি পরামর্শ নয়। আইনি বিষয়ের জন্য যোগ্য আইনজীবীর পরামর্শ নিন।",
    privacyPolicy: "গোপনীয়তা নীতি",
    errors: {
      timeout: "⚠️ অনুরোধ সময় শেষ হয়ে গেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      network: "⚠️ নেটওয়ার্ক ত্রুটি। আপনার সংযোগ পরীক্ষা করুন।",
      server: "⚠️ সার্ভার ত্রুটি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
      unknown:
        "⚠️ একটি অপ্রত্যাশিত ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
    },
  },
};

export default function ChatPage() {
  const { getCurrentSession, addMessage, clearMessages, updateLastMessage } =
    useChatStore();
  const currentSession = getCurrentSession();
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
  }, [currentSession?.messages]);

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
    if (!input.trim() || !currentSession || loading) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    addMessage(newMessage);
    setInput("");
    setLoading(true);

    const aiMessageId = (Date.now() + 1).toString();
    const loadingMessage: Message = {
      id: aiMessageId,
      content: "",
      role: currentSession.type === "lawyer" ? "lawyer" : "assistant",
      timestamp: new Date(),
    };

    addMessage(loadingMessage);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const endpoint =
        currentSession.type === "lawyer"
          ? "/api/v1/chat/ai"
          : "/api/v1/chat/ai";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`.replace(/\/+$/, ""),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
          },
          body: JSON.stringify({
            question: input,
            sessionId: currentSession.id,
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

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
          try {
            const parsedData = JSON.parse(match[1]);
            accumulatedText += parsedData.text;
            updateLastMessage(accumulatedText);
          } catch (e) {
            console.error("Error parsing chunk:", e);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      let errorMessage = t.errors.unknown;

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMessage = t.errors.timeout;
        } else if (error.message.includes("Failed to fetch")) {
          errorMessage = t.errors.network;
        } else if (error.message.includes("HTTP error")) {
          errorMessage = t.errors.server;
        }
      }

      updateLastMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!currentSession) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">{t.welcome}</h2>
          <p className="text-muted-foreground">{t.startNewChat}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentSession.type === "lawyer" ? (
            <Scale className="h-5 w-5" />
          ) : null}
          <h2 className="font-semibold">{currentSession.title}</h2>
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

      <ScrollArea className="flex-1" ref={scrollAreaRef}>
  <div className="space-y-4 p-4">
    {currentSession.messages.map((message) => (
      <div
        key={message.id}
        className={cn(
          "flex flex-col max-w-[80%] rounded-lg p-4",
          message.role === "user"
            ? "ml-auto bg-primary text-primary-foreground"
            : "bg-muted",
          message.role === "lawyer" && "bg-blue-100 dark:bg-blue-900"
        )}
      >
        <ReactMarkdown
          components={{
            // ✅ Removed `inline` from destructured props
            code: ({ node, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <CodeBlock
                  language={match[1]}
                  code={String(children).trim()}
                />
              ) : (
                <code className={className || ""} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </ReactMarkdown>
        <span className="mt-2 text-xs opacity-70">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    ))}
  </div>
</ScrollArea>


      <div className="p-4 border-t">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <Button
            variant="ghost"
            size="icon"
            className={cn(isRecording && "text-destructive")}
            onClick={() => setIsRecording(!isRecording)}
            title={isRecording ? t.stopRecording : t.startRecording}
            disabled={loading}
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
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder={t.placeholder}
            className="flex-1"
            disabled={loading}
          />

          <Button
            onClick={handleSend}
            disabled={!input.trim() || loading}
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
        <p>{t.legalDisclaimer}</p>
        <Link href="/privacy-policy" className="text-blue-500 hover:underline">
          {t.privacyPolicy}
        </Link>
      </div>
    </div>
  );
}
