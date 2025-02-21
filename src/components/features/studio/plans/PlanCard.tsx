import { PlanProps, SubscriptionRazorpay } from "@/types";
import { FeatureList } from "@/components/features/studio/plans/FeatureList";
import { useRazorpayCustomer } from "@/store/hooks/useRazorapyCustomer";
import { useSession } from "next-auth/react";
import { useRazorpaySubscription } from "@/store/hooks/useRazorpaySubscription";
import { useRouter } from "next/navigation";
import { useRazorpayScript } from "@/store/hooks/useRazorpayScript";
import { useState } from "react";
import { PaymentModal } from "@/components/features/studio/plans/PaymentModal";
import { useAtomValue } from "jotai";
import { subscriptionAtom } from "@/store/atoms/subscriptionAtom";
import { unixToLocalTime } from "@/lib/common/time";
import { calculatePlanSwitch } from "@/lib/common/plan";
import { PlanChangeModal } from "@/components/features/studio/plans/PlanChangeModal";
import {
  PopularBadge,
  PlanHeader,
} from "@/components/features/studio/plans/PlanUtils";

export const PlanCard: React.FC<PlanProps> = ({
  id,
  displayName,
  description,
  price,
  limits,
  features,
  isPopular,
  isSubscribed,
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPlanChangeModalOpen, setIsPlanChangeModalOpen] = useState(false);
  const [switchDetails, setSwitchDetails] = useState<{
    nextPlanStartDate: number;
    remainingDays: number;
    amountDue: number;
  } | null>(null);
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState<
    string | null
  >(null);
  const { data: session } = useSession();
  const router = useRouter();
  const scriptLoaded = useRazorpayScript();
  const { getOrCreateCustomer, loading: customerLoading } =
    useRazorpayCustomer();
  const {
    createSubscription,
    verifySubscription, // Add this
    loading: subscriptionLoading,
  } = useRazorpaySubscription();
  const subscription = useAtomValue(subscriptionAtom);
  const isCurrentPlan =
    (subscription.status === "active" ||
      subscription.status === "authenticated") &&
    subscription.planId === price.pgPlanId;
  const isProcessing = subscription.status === "loading";
  const loading = customerLoading || subscriptionLoading;
  // console.log("Subscription details:", {
  //   price: price.dayPrice,
  //   amount: subscription.amount,
  //   startTime: unixToLocalTime(subscription.currentStart),
  //   endTime: unixToLocalTime(subscription.currentEnd),
  // });

  const convertToINR = (usdCents: number) => {
    const conversionRate = 86.63; // USD to INR approximate rate
    return Math.round(usdCents * conversionRate / 100);
  };

  const handlePayment = (data: SubscriptionRazorpay) => {
    if (!scriptLoaded) {
      alert("Payment system is loading. Please try again.");
      return;
    }
    setCurrentSubscriptionId(data.subscription.id);
    setIsPaymentModalOpen(true);

    const options = {
      key: data.razorpayKeyId,
      subscription_id: data.subscription.id,
      name: "EasytoVideo",
      handler: async () => {
        let attempts = 0;
        const maxAttempts = 12; // 1 minute (12 * 5 seconds)

        const checkSubscription = async () => {
          if (attempts >= maxAttempts) {
            alert("Payment verification timed out. Please contact support.");
            return;
          }

          const verified = await verifySubscription(
            data.subscription.id, 
            session!.user.id,
            subscription.planId,
            subscription.status === 'active' || subscription.status === 'authenticated',
            subscription.credit
          );
          
          if (verified) {
            // setIsPaymentModalOpen(false);
            return;
          }

          attempts++;
          setTimeout(checkSubscription, 5000);
        };

        checkSubscription();
      },
      prefill: {
        email: session?.user?.email,
        name: session?.user?.name,
      },
      theme: {
        color: "#2563EB",
      },
      modal: {
        ondismiss: () => {
          setIsPaymentModalOpen(false);
          setCurrentSubscriptionId(null);
        },
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  const handleSubscribe = async () => {
    if (!session?.user) {
      alert("Please sign in to subscribe");
      return;
    }

    try {
      // console.log("subscription new", subscription);
      // If user has an active subscription, show plan change modal
      if (
        subscription.status === "active" ||
        subscription.status === "authenticated"
      ) {
        const details = calculatePlanSwitch({
          currentPrice: subscription.amount || 0,
          newPrice: price.amount || 0,
          billingCycleDays: 30,
          currentStartDate: subscription.currentStart || 0,
          currentEndDate: subscription.currentEnd || 0,
        });
        setSwitchDetails(details);
        setIsPlanChangeModalOpen(true);
        return;
      }

      // For new subscriptions, proceed directly
      await processSubscription();
    } catch (error) {
      //console.error("Subscription failed:", error);
      alert("Failed to initialize subscription process");
    }
  };

  const processSubscription = async (switchDate?: number) => {
    try {
      const customerId = await getOrCreateCustomer(session!.user.id);
      const data = await createSubscription(
        session!.user.id,
        customerId,
        price.pgPlanId,
        subscription.subscriptionId,
        switchDate || null,
        price.amount,
        displayName
      );
      handlePayment(data);
    } catch (error) {
      //console.error("Subscription processing failed:", error);
      alert("Failed to process subscription");
    }
  };

  const handlePlanChangeConfirm = async () => {
    setIsPlanChangeModalOpen(false);
    if (switchDetails) {
      await processSubscription(switchDetails.nextPlanStartDate);
    }
  };

  // Add subscription info if current plan
  const renderSubscriptionInfo = () => {
    if (!isCurrentPlan || !subscription.currentEnd) return null;

    return (
      <div className="mt-2 text-sm text-muted-text">
        <p>
          Current billing period ends:{" "}
          {unixToLocalTime(subscription.currentEnd)}
        </p>
      </div>
    );
  };

  return (
    <>
      <div
        className={`rounded-2xl p-8 bg-white border transition-all duration-200 hover:shadow-lg
        ${
          isPopular
            ? "border-2 border-primary shadow-md scale-105"
            : "border-neutral/20"
        }`}
      >
        {isPopular && <PopularBadge />}
        <PlanHeader displayName={displayName} description={description} />
        <div className="mt-6 mb-8">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-background-text">
                ${(price.amount / 100).toFixed(2)}
              </span>
              <span className="text-neutral">/{price.interval}</span>
            </div>
            <div className="text-sm text-muted-text mt-1">
              (₹{convertToINR(price.amount)} INR)
            </div>
          </div>
          <button
            onClick={handleSubscribe}
            disabled={isCurrentPlan || isProcessing || loading}
            className={`w-full mt-6 py-3 px-4 rounded-xl font-medium text-sm transition-all
              ${isProcessing ? "opacity-75 cursor-wait" : ""}
              ${
                isCurrentPlan
                  ? "bg-neutral cursor-not-allowed text-white"
                  : isPopular
                  ? "bg-primary hover:bg-primary/90 text-primary-text shadow-sm hover:shadow-md"
                  : "bg-primary hover:bg-primary/90 text-primary-text border border-neutral/20"
              }`}
          >
            {isProcessing || loading
              ? "Processing..."
              : isCurrentPlan
              ? "Current Plan"
              : "Subscribe Now"}
          </button>
        </div>
        {/* {renderSubscriptionInfo()} */}
        <div className="space-y-6">
          <FeatureList title="Core Features" features={features.core} />
          <FeatureList title="Advanced Features" features={features.advanced} />
          <FeatureList title="Support" features={features.support} />
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        subscriptionId={currentSubscriptionId}
      />
      <PlanChangeModal
        isOpen={isPlanChangeModalOpen}
        onClose={() => setIsPlanChangeModalOpen(false)}
        onConfirm={handlePlanChangeConfirm}
        currentPlan={{
          displayName: "Current Plan",
          price: {
            amount: subscription.amount || 0,
            interval: "month",
            currency: "USD",
            pgPlanId: subscription.planId || "",
            dayPrice: (subscription.amount || 0) / 30,
          },
        }}
        newPlan={{
          displayName,
          price,
        }}
        nextBillingDate={switchDetails?.nextPlanStartDate || 0}
        amountDue={switchDetails?.amountDue || 0}
      />
    </>
  );
};
