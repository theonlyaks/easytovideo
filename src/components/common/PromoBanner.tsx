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
    <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 px-4 py-3 text-white shadow-md">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 text-center sm:flex-row">
        <div className="flex-1" />
        <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
          <span className="text-lg font-extrabold sm:text-xl">90% OFF:</span>
          <span className="font-medium">$2/month Subtitles for First 1000 Spots Only!</span>
          <button 
            className="mt-1 whitespace-nowrap rounded-md bg-white px-3 py-1 font-semibold text-pink-600 transition-colors hover:bg-gray-100 hover:text-pink-700 sm:mt-0"
            onClick={handleJoinNowClick}
          >
            Join Now!
          </button>
        </div>
        <div className="flex-1 text-right">
          <button
            className="flex h-6 w-6 items-center justify-center rounded-full text-white hover:bg-white/20 hover:text-white"
            onClick={() => setIsVisible(false)}
            aria-label="Close promotion"
          >
            ×
          </button>
        </div>
      </div>
      <div className="absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 transform rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -right-10 top-1/2 h-40 w-40 -translate-y-1/2 transform rounded-full bg-white/10 blur-2xl" />
    </div>
  )
}

