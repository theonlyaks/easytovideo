"use client";

import { Sidebar } from "@/components/features/studio/Sidebar";
import PromoBanner from "@/components/common/PromoBanner";
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
      <div className="flex-1 flex flex-col lg:pl-[256px]">
        <PromoBanner />
        <main className="py-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
