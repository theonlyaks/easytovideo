"use client";

import React from "react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AUTH_PROMOTION_ITEMS } from "@/constants";
import { useSearchParams } from "next/navigation";

export function AuthLayout() {
  const [activeSlide, setActiveSlide] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % AUTH_PROMOTION_ITEMS.length);
    }, 5000);
    const referralCode = searchParams.get("refer");
    if (referralCode) {
      localStorage.setItem("referralCode", referralCode);
    }
    return () => clearInterval(timer);
  }, [searchParams]);

  return (    <div className="min-h-screen bg-gradient-to-br from-primary/90 via-primary-dark to-purple-900 bg-super animate-gradient-slow relative overflow-hidden">
      {/* Professional animated background elements */}
      <div className="absolute inset-0 opacity-80">
        {/* Glowing orbs */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-3xl top-1/4 -left-20 animate-float-slow"></div>
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-3xl bottom-1/4 -right-20 animate-float-medium"></div>
        <div className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-2xl top-10 right-1/4 animate-float-slow-reverse"></div>
        
        {/* Sharp geometric shapes */}
        <div className="absolute w-40 h-40 rotate-45 bg-white/5 top-20 left-1/3 animate-float-medium border border-white/10"></div>
        <div className="absolute w-24 h-24 rotate-12 bg-white/5 bottom-20 right-1/3 animate-float-fast border border-white/10"></div>
        
        {/* Small particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Light streaks */}
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent top-1/3 animate-float-fast"></div>
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent top-2/3 animate-float-medium"></div>
      </div>
      
      {/* Centered Auth Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md space-y-6 px-4 sm:px-6 bg-background/90 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="text-center space-y-4">
            <Link
              href="/"
              className="flex justify-center items-center"
            >
              <Image
                src="/logo.svg"
                alt="Itiner"
                width={48}
                height={48}
                className="text-primary mx-auto sm:w-[60px] sm:h-[60px]"
              />
            </Link>
            <p className="text-2xl font-bold text-secondary font-dm-sans">
              Itiner
            </p>
            <p className="text-muted-text text-base sm:text-lg px-2">
              Your all-in-one AI social media companion.
            </p>
          </div>

          <div className="space-y-6 mt-8">
            <GoogleSignInButton />

            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-center text-muted-text">
                Trusted by creators worldwide
              </p>
              <p className="text-xs sm:text-sm text-muted-text text-center px-2 sm:px-6">
                By signing up, you agree to our{" "}
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
