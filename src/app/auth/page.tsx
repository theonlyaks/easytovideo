"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function SignInPage() {
  const router = useRouter();
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner color="primary" text="Loading..." size="lg" />
      </div>
    );
  }

  if (status === "authenticated") {
    router.replace("/studio");
    return null;
  }

  return <AuthLayout />;
}
