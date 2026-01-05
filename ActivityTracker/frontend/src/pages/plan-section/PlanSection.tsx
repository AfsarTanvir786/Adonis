import { Button } from '@/components/ui/button';
import { usePlan } from '@/hooks/plan/usePlan';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function PlanSection() {
  const { data: plans, isLoading, isError } = usePlan();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-40 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
        Failed to load plans. Please try again.
      </div>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <div className="text-gray-600 bg-gray-50 border border-gray-200 p-4 rounded-lg">
        No plans available.
      </div>
    );
  }

  return (
    <section className="space-y-6 m-10">
      <Link to="/dashboard">
        <Button variant="outline" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
      <h2 className="mt-4 text-3xl font-semibold text-gray-900">
        Available Plans
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 min-h-100">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="relative rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-3xl font-semibold text-gray-900">
              {plan.name}
            </h3>

            <p className="mt-10 text-gray-600 text-sm">
              {plan.description || 'No description provided.'}
            </p>

            <div className="mt-4 flex items-baseline gap-1 absolute bottom-5 left-3">
              <span className="text-3xl font-bold text-gray-900">
                ${plan.costPerSeat}
              </span>
              <span className="text-sm text-gray-500">/ seat</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PlanSection;
