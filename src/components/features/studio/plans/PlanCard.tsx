import { PlanProps, PlanPrice, PlanLimits, SubscriptionRazorpay } from '@/types';
import { FeatureList } from '@/components/features/studio/plans/FeatureList';
import { useRazorpayCustomer } from '@/store/hooks/useRazorapyCustomer';
import { useSession } from 'next-auth/react';
import { useRazorpaySubscription } from '@/store/hooks/useRazorpaySubscription';
import { useRouter } from 'next/navigation';
import { useRazorpayScript } from '@/store/hooks/useRazorpayScript';
import { useState } from 'react';
import { PaymentModal } from './PaymentModal';
import { useAtomValue } from 'jotai';
import { subscriptionAtom } from '@/store/atoms/subscriptionAtom';

const PopularBadge = () => (
  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-text 
    px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
    Most Popular
  </span>
);

const PlanHeader = ({ displayName, description }: { displayName: string; description: string }) => (
  <div>
    <h3 className="text-2xl font-bold text-background-text">{displayName}</h3>
    <p className="text-muted-text mt-2 text-sm">{description}</p>
  </div>
);

const PricingSection = ({ 
  price, 
  limits,
  isSubscribed, 
  isPopular 
}: { 
  price: PlanPrice; 
  limits: PlanLimits;
  isSubscribed?: boolean; 
  isPopular?: boolean; 
}) => (
  <div className="mt-6 mb-8">
    <div className="flex items-baseline gap-1">
      <span className="text-4xl font-bold text-background-text">
        ${(price.amount / 100).toFixed(2)}
      </span>
      <span className="text-neutral">/{price.interval}</span>
    </div>
    <button
      disabled={isSubscribed}
      className={`w-full mt-6 py-3 px-4 rounded-xl font-medium text-sm transition-all
        ${isSubscribed
          ? 'bg-neutral cursor-not-allowed text-white'
          : isPopular 
            ? 'bg-primary hover:bg-primary/90 text-primary-text shadow-sm hover:shadow-md' 
            : 'bg-background hover:bg-background/90 text-background-text border border-neutral/20'
        }`}
    >
      {isSubscribed ? 'Current Plan' : 'Subscribe Now'}
    </button>
  </div>
);

export const PlanCard: React.FC<PlanProps> = ({ 
  id,
  displayName, 
  description,
  price, // contains pgPlanId
  limits, 
  features, 
  isPopular,
  isSubscribed 
}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [currentSubscriptionId, setCurrentSubscriptionId] = useState<string | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  const scriptLoaded = useRazorpayScript();
  const { getOrCreateCustomer, loading: customerLoading } = useRazorpayCustomer();
  const { createSubscription, loading: subscriptionLoading } = useRazorpaySubscription();
  const subscription = useAtomValue(subscriptionAtom);
  const isCurrentPlan = subscription.status === 'active' && subscription.planId === price.pgPlanId;
  const isProcessing = subscription.status === 'loading';
  const loading = customerLoading || subscriptionLoading;

  const handlePayment = (data:SubscriptionRazorpay) => {
    if (!scriptLoaded) {
      alert('Payment system is loading. Please try again.');
      return;
    }

    setCurrentSubscriptionId(data.subscription.id);
    setIsPaymentModalOpen(true);

    const options = {
      key: data.razorpayKeyId,
      subscription_id: data.subscription.id,
      name: "EasytoVideo",
      handler: () => {
      },
      prefill: {
        email: session?.user?.email,
        name: session?.user?.name
      },
      theme: {
        color: "#2563EB"
      },
      modal: {
        ondismiss: () => {
          setIsPaymentModalOpen(false);
          setCurrentSubscriptionId(null);
        }
      }
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  const handleSubscribe = async () => {
    if (!session?.user) {
      alert('Please sign in to subscribe');
      return;
    }

    try {
      const customerId = await getOrCreateCustomer(session.user.id);
      console.log("sadsad",customerId)
      const data = await createSubscription(
        session.user.id, 
        customerId, 
        price.pgPlanId
      );
      console.log("1sadsad",data)

      handlePayment(data);
      
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Failed to initialize subscription process');
    }
  };

  return (
    <>
      <div className={`relative rounded-2xl p-8 bg-white border transition-all duration-200 hover:shadow-lg
        ${isPopular ? 'border-2 border-primary shadow-md scale-105' : 'border-neutral/20'}`}
      >
        {isPopular && <PopularBadge />}
        <PlanHeader displayName={displayName} description={description} />
        <div className="mt-6 mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-background-text">
              ${(price.amount / 100).toFixed(2)}
            </span>
            <span className="text-neutral">/{price.interval}</span>
          </div>
          <button
            onClick={handleSubscribe}
            disabled={isCurrentPlan || isProcessing || loading}
            className={`w-full mt-6 py-3 px-4 rounded-xl font-medium text-sm transition-all
              ${isProcessing ? 'opacity-75 cursor-wait' : ''}
              ${isCurrentPlan
                ? 'bg-neutral cursor-not-allowed text-white'
                : isPopular 
                  ? 'bg-primary hover:bg-primary/90 text-primary-text shadow-sm hover:shadow-md' 
                  : 'bg-background hover:bg-background/90 text-background-text border border-neutral/20'
              }`}
          >
            {isProcessing || loading ? 'Processing...' : isCurrentPlan ? 'Current Plan' : 'Subscribe Now'}
          </button>
        </div>
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
    </>
  );
};