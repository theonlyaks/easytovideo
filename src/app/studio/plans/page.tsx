"use client";
import { useSession } from 'next-auth/react';
import { User } from '@/types';
import { useState, useEffect } from 'react';
import { Plans } from "@/components/features/studio/plans/Plans";
import { useSubscriptionListener } from '@/store/hooks/useSubscriptionListener';

export default function EffectsPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  
  const user: User | null = session?.user ? {
    email: session.user.email || '',
    id: session.user.id || '',
    uid: session.user.uid || ''
  } : null;

  useSubscriptionListener(); // Initialize subscription listener

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
    }
  }, [status]);

  if (loading) {
    return null; 
  }
  
  return <Plans user={user}/>;
}
