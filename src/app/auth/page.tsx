"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { handleLogout } from "@/services/auth/logout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function SignInPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const onLogout = useCallback(() => {
    handleLogout().catch(error => {
      console.error('Logout failed:', error);
    });
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/studio");
    }
  }, [status, router]);

  if (status === "loading") return <LoadingSpinner size="md" />;
  
  if (status === "authenticated") {
    return (
      <div className="p-4">
        <p className="mb-4">{session?.user?.email}</p>
        <button 
          onClick={onLogout}
          className="your-custom-classes">
          Custom Logout Button
        </button>
      </div>
    );
  }

  return <AuthLayout />;
}
