import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AinBondhu - Your Legal Companion",
  description: "Get instant legal assistance with AinBondhu",
  icons: {
    icon: "/fav/favicon.ico",
    apple: "/fav/apple-touch-icon.png",
    shortcut: "/fav/favicon-16x16.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar /> {/* ✅ Navbar will handle hiding itself */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
