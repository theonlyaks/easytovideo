import { AuthState } from "@/types";
import { PlanCard } from "@/components/features/studio/plans/PlanCard";
import { usePlans } from "@/store";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export function Plans({ user }: AuthState) {
  const { plans, loading, error } = usePlans();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner color="primary" text="Loading..." size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-16">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-4 sm:mt-0">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-background-text mb-3 sm:mb-4">
          Choose the Perfect Plan
        </h1>
        <p className="text-base sm:text-lg text-muted-text px-4 sm:px-0">
          Select a plan that works best for you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 max-w-sm sm:max-w-none mx-auto">
        {plans.map((plan) => (
          <PlanCard key={plan.id} {...plan} />
        ))}
      </div>

      <div className="text-center space-y-2 mt-6 sm:mt-8 px-4 sm:px-0">
        <p className="text-xs sm:text-sm text-muted-text">
          All plans include our core platform features.
          <button className="text-primary ml-1 hover:underline focus:outline-none">
            Compare all features
          </button>
        </p>
        <p className="text-sm ">
          Note: USD prices shown are approximate. Actual charges may vary based on current exchange rates at the time of payment.
        </p>
      </div>
    </div>
  );
}
