import React, { memo } from 'react';
import { DEMO_STEPS } from '@/constants';
import { DemoStepMemo } from '@/components/features/studio/subtitle/Demo/DemoStepMemo';

export const Demo = memo(function Demo() {
  return (
    <section className="mt-12 space-y-6" aria-labelledby="how-it-works-title">
      <h2 id="how-it-works-title" className="text-xl font-medium text-center">
        How It Works
      </h2>
      
      <div className="grid grid-cols-1 gap-6" 
           style={{ 
             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
           }}>
        {DEMO_STEPS.map((step) => (
          <DemoStepMemo key={step.step} {...step} />
        ))}
      </div>
    </section>
  );
});
