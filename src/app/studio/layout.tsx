"use client";

import { Sidebar } from "@/components/studio/Sidebar";
import { PropsWithChildren } from "react";

export default function StudioLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8">{children}</main>
    </div>
  );
}
