import { AuthState } from '@/types';
import { PlanCard } from '@/components/features/studio/plans/PlanCard';
import { usePlans } from '@/store';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const PlansHeader = () => (
  <div className="text-center max-w-3xl mx-auto mb-16">
    <h1 className="text-4xl font-bold text-background-text mb-4">
      Choose the Perfect Plan for Your Video Needs
    </h1>
    <p className="text-lg text-muted-text">
      Select a plan that works best for you
    </p>
  </div>
);

const PlansFooter = () => (
  <p className="text-center mt-8 text-sm text-muted-text">
    All plans include our core platform features. 
    <span className="text-primary ml-1">
      Compare all features
    </span>
  </p>
);

export function Plans({user}: AuthState) {
  const { plans, loading, error } = usePlans();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner color='primary' text='Loading...' size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-16">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4">
      <PlansHeader />
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PlanCard key={plan.id} {...plan} />
        ))}
      </div>
      <PlansFooter />
    </div>
  );
}