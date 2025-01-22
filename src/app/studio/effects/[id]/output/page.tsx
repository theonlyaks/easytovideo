"use client";

import { useParams } from 'next/navigation';
import { EffectOutput } from '@/components/features/studio/effects/EffectOutput';
import { useSession } from 'next-auth/react';
import { User } from '@/types';
import { useState, useEffect } from 'react';

export default function EffectOutputPage() {
  const params = useParams();
  const effectId = params.id as string;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  
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

  return <EffectOutput effectId={effectId} user={user} />;
}
