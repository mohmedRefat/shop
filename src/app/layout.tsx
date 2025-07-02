"use client";
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const cairo = Cairo({ subsets: ["arabic"], weight: ["400", "700"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <html lang="en" suppressHydrationWarning>
          <body className={cairo.className}>
            <header className="flex items-center justify-between px-6 py-3 bg-[#232b36] shadow-md">
              <div className="flex items-center gap-8">
                <Navbar />
              </div>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton>
                    <button className="text-white hover:underline font-medium">Sign in</button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer shadow hover:bg-[#5936c7] transition">Sign Up</button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </header>
            {children}
          </body>
        </html>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
