export interface PlanFeature {
  id: string;
  text: string;
  included: boolean;
  isNew?: boolean;
  isPro?: boolean;
  value?: string;
}

export interface PlanPrice {
  amount: number;
  currency: string;
  interval: 'month' | 'year';
  pgPlanId: string;
  dayPrice: number;
}

export interface PlanLimits {
  audioGenerations: number;
  savedGenerations: number;
  audioQuality: string;
  storageGB: number;
  maxProjects: number;
}

export interface PlanMetadata {
  createdAt: string;
  updatedAt: string;
  validFrom: string;
  validUntil: string | null;
}

export interface PlanFeatures {
  core: PlanFeature[];
  advanced: PlanFeature[];
  support: PlanFeature[];
}

export interface PlanProps {
  id: string;
  name: string;
  displayName: string;
  description: string;
  type: 'monthly' | 'yearly';
  status: 'active' | 'inactive';
  version: number;
  sortOrder: number;
  isPopular: boolean;
  isSubscribed?: boolean;
  price: PlanPrice;
  limits: PlanLimits;
  features: PlanFeatures;
  metadata: PlanMetadata;
}

// Helper interfaces for components
export interface FeatureListProps {
  features: PlanFeature[];
  title: string;
}

export interface PricingSectionProps {
  price: PlanPrice;
  isSubscribed?: boolean;
  isPopular?: boolean;
}

export interface PlanHeaderProps {
  displayName: string;
  description: string;
}