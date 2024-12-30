"use client";

import { Sidebar } from "@/components/features/studio/Sidebar";
import { PropsWithChildren } from "react";

export default function StudioLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 py-4 md:p-8">{children}</main>
    </div>
  );
}
