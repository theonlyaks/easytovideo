"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAtomValue } from "jotai"
import { subscriptionAtom } from "@/store/atoms/subscriptionAtom"

interface PromoBannerProps {
  overrideCheck?: boolean;
}

export default function PromoBanner({ overrideCheck = false }: PromoBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()
  const subscription = useAtomValue(subscriptionAtom)
  
  // Don't show anything if manually closed
  if (!isVisible) return null
  
  // If overrideCheck is true, bypass all other visibility checks
  if (!overrideCheck) {
    // Hide banner during loading state
    if (subscription.status === 'loading') {
      return null
    }
    
    // Hide banner if user has an active subscription
    if (subscription.status === 'active' || subscription.status === 'authenticated') {
      return null
    }
  }
  
  // Only show banner when subscription is loaded and user is not subscribed (or when overrideCheck is true)
  const handleJoinNowClick = () => {
    router.push("/studio/plans")
  }

  return (
<div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-3 py-2 text-white shadow-md sm:px-4 sm:py-3">
  <div className="container mx-auto flex flex-col items-center justify-between gap-1 text-center sm:flex-row sm:gap-2">
    <div className="flex-1 sm:flex-1" />
    <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
      <div className="flex flex-wrap items-center justify-center gap-1">
        <span className="text-base font-extrabold sm:text-lg">Get 3 Months for $5</span>
        <span className="text-sm font-medium sm:text-base sm:font-medium">
         <span className="hidden sm:inline"> Subtitles for Limited Time!</span>
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 sm:hidden">
        <button 
          className="whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-pink-600 transition-colors hover:bg-gray-100 hover:text-pink-700 sm:px-3 sm:py-1 sm:text-base sm:mt-1"
          onClick={handleJoinNowClick}
        >
          Join Now!
        </button>
        <button
          className="flex h-5 w-5 items-center justify-center rounded-full text-white hover:bg-white/20 hover:text-white sm:h-6 sm:w-6 sm:mt-1"
          onClick={() => setIsVisible(false)}
          aria-label="Close promotion"
        >
          ×
        </button>
      </div>
    </div>
    <div className="hidden sm:flex sm:flex-1 sm:text-right sm:items-center sm:justify-end sm:gap-2">
      <button 
        className="whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-xs font-semibold text-pink-600 transition-colors hover:bg-gray-100 hover:text-pink-700 sm:px-3 sm:py-1 sm:text-base sm:mt-1"
        onClick={handleJoinNowClick}
      >
        Join Now!
      </button>
      <button
        className="flex h-5 w-5 items-center justify-center rounded-full text-white hover:bg-white/20 hover:text-white sm:h-6 sm:w-6 sm:mt-1"
        onClick={() => setIsVisible(false)}
        aria-label="Close promotion"
      >
        ×
      </button>
    </div>
  </div>
</div>
  )
}

