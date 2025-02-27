"use client";
import { Effects } from "@/components/features/studio/effects/Effects";
import { useSession } from 'next-auth/react';
import { User } from '@/types';
import { useState, useEffect } from 'react';
import { useSubscriptionListener } from "@/store/hooks/useSubscriptionListener";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function EffectsPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  
  // Get subscription data and ensure it's loaded
  const subscription = useSubscriptionListener();
  const subscriptionLoaded = subscription.status !== 'loading';
  
  const user: User | null = session?.user ? {
    email: session.user.email || '',
    id: session.user.id || '',
    uid: session.user.uid || ''
  } : null;

  useEffect(() => {
    if (status !== "loading" && subscriptionLoaded) {
      setLoading(false);
    }
  }, [status, subscriptionLoaded]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner 
          color="primary" 
          text="Loading..." 
          size="lg" 
        />
      </div>
    ); 
  }
  
  return <Effects user={user}/>;
}
