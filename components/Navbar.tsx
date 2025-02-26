"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Define pages where Navbar should not be shown
  const noNavPages = ["/login", "/register", "/dashboard", "/chat"];
  const shouldHideNavbar = noNavPages.includes(pathname); // ✅ Instead of returning early

  useEffect(() => {
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
    <nav className={`nav-container ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          {/* Styled Logo */}
          <Link href="/" className="text-2xl font-semibold">
            <span className="italic text-blue-500">AI</span>
            <span className="text-blue-500">n</span>Bondhu
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/resources" className="nav-link">
              Resources
            </Link>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
            <Link href="/faq" className="nav-link">
              FAQ
            </Link>
            <Link href="/privacy-policy" className="nav-link">
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Authentication & Call-to-Action Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link href="/chat" className="try-button">
            Ask AinBondhu
          </Link>
        </div>
      </div>
    </nav>
  );
};
