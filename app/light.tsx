"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  MessageSquare,
  Scale,
  FileText,
  Users,
  Brain,
  Sparkles,
  Lock,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Building2,
  GraduationCap,
  CheckCircle,
  Lightbulb,
  FileCheck,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  Shield,
  Clock,
  Zap,
  HeadphonesIcon,
  BarChart,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
// import NVIDIALOGO from "@/public/image/NVIDIA.svg";

// Company logos with proper URLs
const companyLogos = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5d/New_Bloomberg_Logo.svg",
    alt: "Bloomberg",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/WSJ_Logo.svg",
    alt: "Digital Journal",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/1/11/Business_Insider_Logo.svg",
    alt: "Business Insider",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Associated_Press_logo_2012.svg",
    alt: "AP",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Yahoo%21_Finance_logo_2021.png",
    alt: "Yahoo Finance",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f8/LinkedIn_icon_circle.svg",
    alt: "Marketfy",
  },
];

// Screenshots for auto-sliding
const screenshots = [
  "https://framerusercontent.com/images/B2MhwgpkS24BCxKZsBMvBvgQ8rg.png",
  "https://framerusercontent.com/images/8ObzFQmxBBVb3YsOk5I65Lks2i8.png",
];

export default function Home() {
  const [segment, setSegment] = useState<"consumers" | "lawyers">("consumers");
  const [activeTab, setActiveTab] = useState("features");
  const [scrolled, setScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-sliding effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % screenshots.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const features = {
    consumers: [
      {
        icon: <Scale className="w-8 h-8 text-primary" />,
        title: "Legal Consultation",
        description:
          "Get instant answers to your legal questions from our AI assistant.",
      },
      {
        icon: <FileText className="w-8 h-8 text-primary" />,
        title: "Document Generation",
        description: "Create legal documents and forms with AI assistance.",
      },
      {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: "Professional Directory",
        description: "Connect with verified legal professionals in your area.",
      },
    ],
    lawyers: [
      {
        icon: <Brain className="w-8 h-8 text-primary" />,
        title: "AI-Powered Research",
        description:
          "Enhance your legal research with advanced AI capabilities.",
      },
      {
        icon: <Sparkles className="w-8 h-8 text-primary" />,
        title: "Smart Automation",
        description: "Automate routine tasks and focus on complex legal work.",
      },
      {
        icon: <Lock className="w-8 h-8 text-primary" />,
        title: "Secure Client Portal",
        description: "Manage client communications and documents securely.",
      },
    ],
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "features":
        return (
          <div className="features-grid">
            {features[segment].map((feature, index) => (
              <div key={index} className="feature-card group">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        );
      case "pricing":
        return (
          <div className="grid md:grid-cols-3 gap-8">
            {["Basic", "Pro", "Enterprise"].map((plan) => (
              <div key={plan} className="pricing-card">
                <h3 className="text-2xl font-bold mb-4">{plan}</h3>
                <div className="text-4xl font-bold mb-6">
                  {plan === "Basic" ? "$29" : plan === "Pro" ? "$99" : "Custom"}
                  {plan !== "Enterprise" && (
                    <span className="text-lg">/mo</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-2">
                    <Scale className="w-5 h-5 text-primary" />
                    <span>Feature 1</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>Feature 2</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Feature 3</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
            ))}
          </div>
        );
      case "testimonials":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="testimonial-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20" />
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-400">Legal Professional</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  This AI legal assistant has transformed how I handle routine
                  legal tasks. Its incredibly efficient and accurate.
                </p>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white  text-[#111111]">
      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              {/* <div className="product-badge">
                <span>Product hunt</span>
                <div className="flex items-center gap-1">
                  <span>Product of the day</span>
                  <span className="font-semibold">1st</span>
                </div>
              </div> */}

              <h1 className="hero-text mb-6">
                AinBondhu – Your AI & Lawyer-Powered Legal Assistant
              </h1>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  className={`segment-button ${
                    segment === "consumers" ? "active" : ""
                  }`}
                  onClick={() => setSegment("consumers")}
                >
                  For consumers
                </button>
                <button
                  className={`segment-button ${
                    segment === "lawyers" ? "active" : ""
                  }`}
                  onClick={() => setSegment("lawyers")}
                >
                  For lawyers
                </button>
              </div>

              <p className="text-gray-400 text-lg mb-8">
                Instant legal help, contract validation & lawyer
                consultations—all in one place.
              </p>

              <Link href="/chat" className="try-hero-button inline-block">
                Ask AinBondhu
              </Link>

              {/* <div className="flex items-center gap-8 mt-12">
                <div className="flex items-center">
                  <Image
                    src={NVIDIALOGO}
                    alt="NVIDIA"
                    width={100}
                    height={40}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                  <span className="text-sm text-gray-500 ml-2">
                    Inception program
                  </span>
                </div>
                <div className="flex items-center">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c1/20190925201609%21Google_%22G%22_logo.svg"
                    alt="Google"
                    width={30}
                    height={30}
                    className="opacity-60 hover:opacity-100 transition-opacity"
                  />
                  <span className="text-sm text-gray-500 ml-2">
                    For Startups
                  </span>
                </div>
              </div> */}
            </div>

            <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] md:aspect-[3/4] overflow-hidden rounded-lg">
              {screenshots.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`AinBondhu Interface ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`absolute inset-0 object-contain transition-opacity duration-700 ease-in-out ${
                    currentImage === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Logos Section with Marquee */}
        {/* <div className="max-w-7xl mx-auto px-6 mt-20 overflow-hidden bg-white py-6 rounded-lg">
          <div className="relative">
            <div className="flex animate-marquee items-center space-x-12">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div key={index} className="flex-shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={120}
                    height={40}
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-slate-100 text-sm font-medium mb-4">
              Features
            </div>
            <h2 className="text-5xl font-medium mb-6">Features of AinBondhu</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore features that boost your productivity. From document
              automation to advanced research, we've got the hard work covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Internet-powered Section */}
            <div className="bg-slate-100 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-medium mb-4">
                Instant Legal Answers
              </h3>
              <p className="text-gray-400 mb-8">
                Get quick, AI-generated explanations on Bangladeshi laws in
                simple language.
              </p>
              <div className="relative h-48 flex items-center justify-center">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-10 h-10 text-black" />
                </div>
                <div className="absolute w-full h-full flex items-center justify-center">
                  <div className="w-48 h-48 border border-white/10 rounded-full animate-spin-slow" />
                </div>
              </div>
            </div>

            {/* Ask AinBondhu Section */}
            {/* Ask AinBondhu Section */}
            <div className="bg-slate-100 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-medium mb-4">
                AinBondhu - Your Legal Companion
              </h3>
              <p className="text-gray-400 mb-4">
                No more legal confusion! Get instant insights on Bangladeshi
                laws, talk to AinBondhu, and find simple answers to complex
                legal questions in just a few clicks.
              </p>
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-black" />
                  </div>
                  <span>Need legal advice in Bangladesh? 🏛️</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Select a question from the "Prompts" library below or type
                  your own legal query.
                </p>
                <button className="w-full py-2 rounded-lg bg-slate-100 hover:bg-white/10 transition-colors text-left px-4">
                  + Ask a New Question
                </button>
              </div>
            </div>

            {/* AI Document Handling */}
            <div className="bg-slate-100 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-medium mb-4">
                Contract & Document Validation
              </h3>
              <p className="text-gray-400 mb-4">
                Upload agreements, land documents, business contracts for lawyer
                review.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 bg-white/30 rounded-lg p-3">
                  <FileText className="w-5 h-5" />
                  <span>Land_Deed_Khatian.pdf</span>
                  <span className="text-sm text-gray-400 ml-auto">1.04MB</span>
                </div>
                <div className="flex items-center gap-2 bg-white/30 rounded-lg p-3">
                  <FileText className="w-5 h-5" />
                  <span>Company_Trade_License.pdf</span>
                  <span className="text-sm text-gray-400 ml-auto">854KB</span>
                </div>
                <button className="w-full py-3 rounded-lg bg-white text-black hover:bg-white/80 transition-colors">
                  Compare with AI and Review from Lawyers
                </button>
              </div>
            </div>

            {/* Multi-platform */}
            <div className="bg-slate-100 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-medium mb-4">
                Connect with Lawyers
              </h3>
              <p className="text-gray-400 mb-4">
                Find and consult verified lawyers directly through the platform.
              </p>
              <div className="relative h-48">
                <Image
                  src="https://framerusercontent.com/images/8ObzFQmxBBVb3YsOk5I65Lks2i8.png"
                  alt="Multi-platform Interface"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is AinBondhu for? Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-slate-100 text-sm font-medium mb-4">
              <Users className="w-4 h-4 mr-2" />
              Users
            </div>
            <h2 className="text-5xl font-medium mb-6">Who is AinBondhu for?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Explore features that boost your productivity. From document
              automation to advanced research, we've got the hard work covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Individuals",
                icon: <Users className="w-6 h-6" />,
                description:
                  "Understand your legal rights and get help with contracts, family matters, and disputes.",
              },
              {
                title: "Business Owners & Freelancers",
                icon: <Building2 className="w-6 h-6" />,
                description:
                  "Validate contracts and get expert legal advice on business laws.",
              },
              {
                title: "Employees & Workers",
                icon: <Brain className="w-6 h-6" />,
                description:
                  "Learn about labor rights, workplace disputes, and legal protections.",
              },
              {
                title: "Landowners & Tenants",
                icon: <Lock className="w-6 h-6" />,
                description:
                  "Resolve property disputes and understand real estate laws.",
              },
              {
                title: "Consumers & General Public",
                icon: <Scale className="w-6 h-6" />,
                description:
                  "Protect yourself from fraud and unfair practices.",
              },
              {
                title: "Law Students",
                icon: <GraduationCap className="w-6 h-6" />,
                description:
                  "Access legal resources and practical learning materials.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-slate-100 hover:bg-white/10 backdrop-blur-sm rounded-3xl p-6 transition-all duration-300 hover:translate-y-[-8px]"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-100 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-1 rounded-full bg-slate-100 text-sm font-medium mb-4">
              Advantages
            </div>
            <h2 className="text-5xl font-medium mb-6">
              Why our AI in law is better?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              In contrast to others, our LegalTech software is quick, easy, and
              wallet-friendly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Easy-to-Use AI Assistance",
                icon: <Sparkles className="w-6 h-6 text-primary" />, // Changed icon to emphasize AI-powered simplicity
                description:
                  "Get legal insights in simple terms, no confusing jargon.",
                stats: "Instant Answers", // Highlighting speed & ease of use
              },

              {
                title: "Fast & Secure",
                icon: <Shield className="w-6 h-6" />,
                description:
                  "AI and lawyer services ensure quick and private legal support.",
                stats: "100% Encrypted",
              },

              {
                title: "Lawyer-Powered Validation",
                icon: <CheckCircle className="w-6 h-6 text-green-500" />,
                description:
                  "Ensure your documents and contracts are legally sound.",
                stats: "Legally Verified",
              },

              {
                title: "Affordable & Accessible",
                icon: <BarChart className="w-6 h-6" />,
                description:
                  "Skip expensive legal fees and long waiting times.",
                stats: "-90% Cost",
              },
            ].map((item, index) => (
              <div
                key={index}
                className=" border group relative overflow-hidden rounded-3xl p-8 transition-all duration-300 hover:translate-y-[-8px]"
              >
                {/* Gradient background that animates on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-medium mb-3">{item.title}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="text-primary font-medium">{item.stats}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <div className="bg-slate-100 mt-10 rounded-3xl p-8 backdrop-blur-sm max-w-lg mx-auto">
        <h3 className="text-2xl font-medium mb-4 text-center">
          Partner with AinBondhu
        </h3>
        <p className="text-gray-400 mb-6 text-center">
          Looking for AI-powered legal solutions for your business or firm?
          Let’s connect and explore how AinBondhu can assist your legal needs.
        </p>

        {/* Contact Form */}
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-white rounded-lg border  focus:outline-none focus:ring-2 focus:ring-primary text-black"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Your Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-white rounded-lg border bfocus:outline-none focus:ring-2 focus:ring-primary text-black"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">
              Your Message
            </label>
            <textarea
              placeholder="Tell us how we can help..."
              rows={4}
              className="w-full px-4 py-3 bg-white rounded-lg border bfocus:outline-none focus:ring-2 focus:ring-primary text-black"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-white hover:bg-primary/80 transition-colors text-center text-lg font-medium"
          >
            Send Message
          </button>
        </form>

        {/* Additional Info */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          For bulk queries, legal partnerships, or API integration, email us at{" "}
          <span className="text-primary font-medium">
            enterprise@ainbondhu.com
          </span>
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">AinBondhu</h3>
              <p className="text-gray-400 mb-6">
                Revolutionizing legal assistance in Bangladesh—making it
                simpler, faster, and more accessible for everyone.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-black transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-black transition-colors"
                  >
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} AinBondhu. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
