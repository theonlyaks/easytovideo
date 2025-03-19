import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => (
  <div className="w-full bg-neutral/20 rounded-full h-2 mb-8">
    <div
      className="bg-primary h-2 rounded-full transition-all duration-300"
      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
    />
  </div>
);
