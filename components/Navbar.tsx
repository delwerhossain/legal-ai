"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Define pages where Navbar should not be shown
  const noNavPages = ["/login", "/register", "/dashboard", "/chat"];
  const shouldHideNavbar = noNavPages.includes(pathname);

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

  // ✅ Ensure the Navbar exists in the DOM but is hidden when needed
  if (shouldHideNavbar) return <div />;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white dark:bg-gray-900 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          {/* Styled Logo */}
          <Link 
            href="/" 
            className="text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <span className="italic text-blue-500">AI</span>
            <span className="text-blue-500">n</span>
            <span className="dark:text-white">Bondhu</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/resources" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Resources
            </Link>
            <Link 
              href="/blog" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Contact
            </Link>
            <Link 
              href="/faq" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              FAQ
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Authentication, Theme Toggle & Call-to-Action Button */}
        <div className="flex items-center gap-4">
          {/* <Link
            href="/signin"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Sign in
          </Link> */}
          
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted && (
              theme === "dark" ? (
                <Sun className="h-5 w-5 text-gray-200 hover:text-yellow-400 transition-colors" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 hover:text-blue-500 transition-colors" />
              )
            )}
          </Button>

          <Link 
            href="/chat" 
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-colors"
          >
            Ask AinBondhu
          </Link>
        </div>
      </div>
    </nav>
  );
};