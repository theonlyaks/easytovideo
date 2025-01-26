import { PlanPrice, PlanLimits } from "@/types";

export const PopularBadge = () => (
  <span
    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-text 
    px-4 py-1.5 rounded-full text-sm font-medium shadow-sm"
  >
    Most Popular
  </span>
);

export const PlanHeader = ({
  displayName,
  description,
}: {
  displayName: string;
  description: string;
}) => (
  <div>
    <h3 className="text-2xl font-bold text-background-text">{displayName}</h3>
    <p className="text-muted-text mt-2 text-sm">{description}</p>
  </div>
);

export const PricingSection = ({
  price,
  limits,
  isSubscribed,
  isPopular,
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
        ${
          isSubscribed
            ? "bg-neutral cursor-not-allowed text-white"
            : isPopular
            ? "bg-primary hover:bg-primary/90 text-primary-text shadow-sm hover:shadow-md"
            : "bg-background hover:bg-background/90 text-background-text border border-neutral/20"
        }`}
    >
      {isSubscribed ? "Current Plan" : "Subscribe Now"}
    </button>
  </div>
);
