"use client";

import { Sidebar } from "@/components/features/studio/Sidebar";
import { PropsWithChildren, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function StudioLayout({ children }: PropsWithChildren) {
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/auth");
    }
  }, [status]);

  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed inset-y-0 left-0 z-[2]">
        <Sidebar />
      </div>
      <main className="flex-1 py-4 lg:p-8 lg:pl-[280px] overflow-auto">
        {children}
      </main>
    </div>
  );
}
