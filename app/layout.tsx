"use client"; 
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { usePathname } from "next/navigation"; // ✅ Correct hook for App Router

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // ✅ Use usePathname() instead of useRouter()
  
  // Define pages where the Nav should not appear
  const noNavPages = ["/login", "/register", "/dashboard", "/chat"]; 
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {!noNavPages.includes(pathname) && <Navbar />}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
