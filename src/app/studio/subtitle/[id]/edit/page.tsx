"use client";

import { useParams } from "next/navigation";
import { Edit } from "@/components/features/studio/subtitle/Edit";
import { useSession } from "next-auth/react";
import { User } from "@/types";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function SubtitleEditPage() {
  const params = useParams();
  const projectId = params.id as string;
  const { data: session, status } = useSession();

  const user: User | null = session?.user
    ? {
        email: session.user.email || "",
        id: session.user.id || "",
        uid: session.user.uid || "",
      }
    : null;

  if (status === "loading") {
    return (<div className="mt-12"><LoadingSpinner color="primary" text="Authenticating.."/></div>);  
  }

  return <Edit projectId={projectId} user={user} />;
}
