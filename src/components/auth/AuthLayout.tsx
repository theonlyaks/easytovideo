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

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Left Section - Auth Form */}
        <div className="w-full lg:w-1/2 flex flex-col p-4 sm:p-6 lg:p-8">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md space-y-6 px-4 sm:px-6">
              <div className="text-center space-y-4">
                <Link
                  href="/"
                  className="flex justify-center items-center"
                >
                  <Image
                    src="/logo.svg"
                    alt="EasyToVideo"
                    width={48}
                    height={48}
                    className="text-primary mx-auto sm:w-[60px] sm:h-[60px]"
                  />
                </Link>
                <p className="text-2xl font-bold text-secondary font-dm-sans">
                  EasyToVideo
                </p>
                <p className="text-muted-text text-base sm:text-lg px-2">
                  Turn Your Video Into Viral Videos
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
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
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

        {/* Right Section - Carousel */}
        <div className="hidden lg:block lg:w-1/2 bg-secondary relative">
          <div className="absolute inset-0 bg-opacity-90 flex items-center justify-center p-12">
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-8">
                {React.createElement(AUTH_PROMOTION_ITEMS[activeSlide].icon, {
                  className: "w-24 h-24 text-secondary-text",
                })}
              </div>
              <h2 className="text-3xl font-bold text-secondary-text font-dm-sans">
                {AUTH_PROMOTION_ITEMS[activeSlide].title}
              </h2>
              <p className="text-secondary-text/90 text-lg max-w-md mx-auto">
                {AUTH_PROMOTION_ITEMS[activeSlide].description}
              </p>

              {/* Carousel Indicators */}
              <div className="flex justify-center space-x-2 mt-8">
                {AUTH_PROMOTION_ITEMS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeSlide
                        ? "bg-secondary-text w-6"
                        : "bg-secondary-text/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
