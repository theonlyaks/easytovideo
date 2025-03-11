"use client";

import { useSession } from 'next-auth/react';
import { User } from '@/types';
import { Subtitle } from '@/components/features/studio/subtitle/Subtitle';

export default function SubtitlePage() {
  const { data: session, status } = useSession();
  
  const user: User | null = session?.user ? {
    email: session.user.email || '',
    id: session.user.id || '',
    uid: session.user.uid || ''
  } : null;

  if (status === "loading") {
    return null;
  }

  return <Subtitle user={user} />;
}
