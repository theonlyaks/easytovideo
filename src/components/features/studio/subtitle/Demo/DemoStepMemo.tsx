import React from 'react';
import { DEMO_STEPS } from '@/constants';


export const DemoStepMemo = ({ step, title, description }: typeof DEMO_STEPS[number]) => (
  <article className="bg-white p-4 rounded-lg shadow">
    <div className="mb-3 text-primary text-center text-4xl font-bold" aria-hidden="true">
      {step}
    </div>
    <h3 className="text-lg font-medium text-center mb-2">{title}</h3>
    <p className="text-sm text-muted-text text-center">
      {description}
    </p>
  </article>
);
