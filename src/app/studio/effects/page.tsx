"use client";
import { Effects } from "@/components/features/studio/effects/Effects";
import { useSession } from 'next-auth/react';
import { User } from '@/types';
import { useState, useEffect } from 'react';
import { useSubscriptionListener } from "@/store/hooks/useSubscriptionListener";

export default function EffectsPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  
  useSubscriptionListener(); 
  
  const user: User | null = session?.user ? {
    email: session.user.email || '',
    id: session.user.id || '',
    uid: session.user.uid || ''
  } : null;

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return null; 
  }
  
  return <Effects user={user}/>;
}
