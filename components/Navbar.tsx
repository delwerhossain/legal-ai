"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <nav className={`nav-container ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-semibold">
              AinBondhu
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/resources" className="nav-link">
                Resources
              </Link>
              <Link href="/affiliate" className="nav-link">
                Affiliate
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
            </div>
          </div>
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
    </>
  );
};
