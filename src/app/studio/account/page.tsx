"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Account } from "@/components/features/studio/account/Account";
import { useSubscriptionListener } from "@/store/hooks/useSubscriptionListener";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useDeviceType } from "@/store/hooks/useDeviceType";

export default function AccountPage() {
  const { status } = useSession();
  const router = useRouter();
  const isMobile = useDeviceType();

  useSubscriptionListener();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner 
          color="primary" 
          text={isMobile ? "Loading from mobile..." : "Loading..."} 
          size="lg" 
        />
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/auth");
  }

  return (
    <Account />
  );
}
