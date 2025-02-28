"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Send, X, Trash2, Scale, Sun, Moon, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { useChatStore } from "@/lib/chat-store";
import { Message } from "@/types/chat";
import { CodeBlock } from "@/components/code-block";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { useTheme } from "next-themes";

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
  const {
    getCurrentSession,
    addMessage,
    createSession,
    clearMessages,
    updateLastMessage,
  } = useChatStore();
  const currentSession = getCurrentSession();
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const { theme, setTheme } = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <div className="h-full grid items-center justify-center">
        <div>
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">{t.welcome}</h2>
            <p className="text-muted-foreground">{t.startNewChat}</p>
          </div>
          <div className="p-4 space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => createSession("general")}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => createSession("lawyer")}
            >
              <Scale className="mr-2 h-4 w-4" />
              New Lawyer Chat
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {currentSession.type === "lawyer" ? (
            <Scale className="h-5 w-5" />
          ) : null}
          <h2 className="font-semibold">{currentSession.title}</h2>
        </div>

        <Link
          href="/"
          className="text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <span className="italic text-blue-500">AI</span>
          <span className="text-blue-500">n</span>
          <span className="dark:text-white">Bondhu</span>
        </Link>

        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={clearMessages}
            className="text-destructive"
            title={t.clearChat}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted &&
              (theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-200 hover:text-yellow-400 transition-colors" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 hover:text-blue-500 transition-colors" />
              ))}
          </Button>
        </div>
      </div>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 px-2 sm:px-4" ref={scrollAreaRef}>
        <div className="space-y-4 p-2 sm:p-4">
          {currentSession.messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col max-w-[90%] md:max-w-[80%] rounded-lg p-3 sm:p-4",
                message.role === "user"
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted",
                message.role === "lawyer" && "bg-slate-900 text-white"
              )}
            >
              <ReactMarkdown
                components={{
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

      {/* Input Area */}
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

          <div className="flex-1 relative">
            <textarea
             ref={inputRef as React.RefObject<HTMLTextAreaElement>} 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t.placeholder}
              className="w-full resize-none overflow-hidden border rounded-lg p-2 min-h-[40px] max-h-[200px]"
              disabled={loading}
              rows={1}
              style={{ height: "auto" }}
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
            />
          </div>

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
    </div>
  );
}
