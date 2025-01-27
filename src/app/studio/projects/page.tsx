"use client";
import { ProjectListComponent } from "@/components/features/studio/projects/Projects";
import { useSession } from 'next-auth/react';
import { User, AuthProps} from '@/types';
import { useState, useEffect } from 'react';

export default function ProjectsPage() {
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
  
  return <ProjectListComponent user={user} />;
}
