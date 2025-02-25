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
            
          {/* 1️⃣ Bold "AI" and Different Color */}
          {/* <Link href="/" className="text-2xl font-semibold">
  <span className="text-blue-500 font-bold">Ai</span><span className="text-primary text-blue-500">n</span>Bondhu
</Link>        */}

{/* 2️⃣ Different Font Style for AI */}
<Link href="/" className="text-2xl font-semibold">
  <span className="italic text-blue-500">AI</span><span className="text-blue-500">n</span>Bondhu
</Link>

{/* 3️⃣ Use Capitalization & Spacing */}
{/* <Link href="/" className="text-2xl font-semibold">
  Ain<span className="uppercase text-blue-500 tracking-wider">AI</span>Bondhu
</Link> */}

{/* 4️⃣ Typography Trick (AI as Subscript or Superscript) */}
{/* <Link href="/" className="text-2xl font-semibold">
  <span className="text-blue-500 font-bold">Ai</span><sub className="text-blue-500 font-bold">n</sub>Bondhu
</Link> */}

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
