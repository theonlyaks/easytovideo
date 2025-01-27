"use client";

import { Sidebar } from "@/components/features/studio/Sidebar";
import { PropsWithChildren } from "react";

export default function StudioLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed inset-y-0 left-0 z-[2]">
        <Sidebar />
      </div>
      <main className="flex-1 py-4 md:p-8 md:pl-[280px] overflow-auto">
        {children}
      </main>
    </div>
  );
}
