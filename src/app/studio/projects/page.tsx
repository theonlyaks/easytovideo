"use client";
import { ProjectListComponent } from "@/components/features/studio/projects/Projects";
import { useSession } from 'next-auth/react';
import { User } from '@/types';

export default function ProjectsPage() {
  const { data: session, status } = useSession();
  
  const user: User | null = session?.user ? {
    email: session.user.email || '',
    id: session.user.id || '',
    uid: session.user.uid || ''
  } : null;

  if (status === "loading") {
    return null; 
  }
  
  return <ProjectListComponent user={user} />;
}
