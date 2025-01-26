"use client";
import { auth } from "@/lib/common/firebase";
import { FiUser, FiLogOut, FiCreditCard, FiClock, FiList, FiXCircle } from "react-icons/fi";
import { useAtomValue } from "jotai";
import { subscriptionAtom } from "@/store/atoms/subscriptionAtom";
import { unixToLocalTime } from "@/lib/common/time";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useRazorpaySubscription } from "@/store/hooks/useRazorpaySubscription";
import { useState } from "react";
import { CancelSubscriptionModal } from "./CancelSubscriptionModal";

export function Account() {
    const user = auth.currentUser;
    const subscription = useAtomValue(subscriptionAtom);
    const router = useRouter();
    const { cancelSubscription, loading: cancelLoading } = useRazorpaySubscription();
    const [cancelError, setCancelError] = useState<string | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);
    
    const isLoading = subscription.status === "loading";
    const hasActivePlan = subscription.status === "active" || subscription.status === "authenticated";
    const isCancelled = subscription.status === "cancelled";
    const endDate = subscription.currentEnd ? unixToLocalTime(subscription.currentEnd) : null;
    const currentPlanAmount = subscription.amount ? (subscription.amount / 100).toFixed(2) : null;
    console.log("ASdsa",subscription)
    const handleLogout = async (): Promise<void> => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const handlePlanNav = () => {
        router.push('/studio/plans');
    };

    const handleCancelSubscription = async () => {
        if (!subscription.subscriptionId) return;
        
        try {
            await cancelSubscription(subscription.subscriptionId,subscription.status);
            setShowCancelModal(false);
            router.refresh(); // Refresh the page to update subscription status
        } catch (error) {
            console.error("Error cancelling subscription:", error);
            setCancelError("Failed to cancel subscription. Please try again.");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner color="primary" text="Loading..." size="lg" />
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <h1 className="text-3xl font-bold text-background-text mb-8">Account</h1>

            {/* Profile */}
            <div className="bg-white rounded-lg border mb-6">
                <div className="p-6 flex items-center gap-6">
                    <div className="h-16 w-16 rounded-full bg-background flex items-center justify-center overflow-hidden">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <FiUser className="w-6 h-6 text-neutral" />
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl font-medium text-background-text mb-1">
                            {user?.displayName || "User"}
                        </h2>
                        <p className="text-neutral-text">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Subscription & Actions */}
            <div className="bg-white rounded-lg border">
                {/* Plan Info */}
                {hasActivePlan ? (
                    <div className="p-6 flex items-center justify-between border-b">
                        <div className="flex items-center gap-4">
                            <FiCreditCard className="w-5 h-5 text-primary" />
                            <div>
                                <div className="font-medium text-background-text">{subscription.planName}</div>
                                <div className="text-sm text-neutral-text mt-0.5">
                                    ${currentPlanAmount}/month
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={handlePlanNav}
                            className="px-4 py-2 rounded-md text-primary hover:bg-background transition-colors"
                        >
                            Change Plan
                        </button>
                    </div>
                ) : (
                    <div className="p-6 border-b">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <FiCreditCard className="w-5 h-5 text-neutral" />
                                <span className="text-neutral-text">No active plan</span>
                            </div>
                            <button 
                                onClick={handlePlanNav}
                                className="px-4 py-2 rounded-md bg-primary text-primary-text hover:bg-primary/90 transition-colors"
                            >
                                Select Plan
                            </button>
                        </div>
                    </div>
                )}

                {/* Billing Date / Plan Expiry */}
                {endDate && (
                    <div className="p-6 flex items-center justify-between border-b">
                        <div className="flex items-center gap-4">
                            <FiClock className="w-5 h-5 text-neutral" />
                            <span className="font-medium text-background-text">
                                {isCancelled ? "Plan Expires On" : "Next Billing Date"}
                            </span>
                        </div>
                        <span className="text-neutral-text">{endDate}</span>
                    </div>
                )}

                {/* Payment History - Updated redirect path */}
                <button 
                    onClick={() => router.push('/studio/invoices')}
                    className="w-full p-6 flex items-center justify-between border-b hover:bg-background transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <FiList className="w-5 h-5 text-neutral" />
                        <span className="font-medium text-background-text">
                            Payment History
                        </span>
                    </div>
                </button>

                {/* Cancel Membership */}
                {hasActivePlan && !isCancelled && (
                    <>
                        <button 
                            onClick={() => setShowCancelModal(true)}
                            className="w-full p-6 flex items-center justify-between border-b hover:bg-background transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <FiXCircle className="w-5 h-5 text-primary" />
                                <span className="font-medium text-background-text">
                                    Cancel Membership
                                </span>
                            </div>
                        </button>
                        {cancelError && (
                            <div className="px-6 py-2 text-sm text-red-500">
                                {cancelError}
                            </div>
                        )}
                    </>
                )}

                {/* Sign Out */}
                <div className="p-6">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 py-3 text-primary hover:bg-background rounded-md transition-colors"
                    >
                        <FiLogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Add Modal */}
            <CancelSubscriptionModal 
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={handleCancelSubscription}
                isLoading={cancelLoading}
            />
        </div>
    );
}