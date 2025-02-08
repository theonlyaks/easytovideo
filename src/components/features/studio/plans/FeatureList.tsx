import { FeatureListProps } from '@/types';
import { FiCheck, FiX } from 'react-icons/fi';

export const FeatureList: React.FC<FeatureListProps> = ({ features, title }) => (
  <div className="space-y-2">
    <p className="text-sm font-medium text-neutral mb-3">{title}</p>
    {features.map((feature) => (
      <div key={feature.id} className="flex items-center gap-2 text-background-text group">
        {feature.included ? (
          <FiCheck className="w-5 h-5 text-accent" />
        ) : (
          <FiX className="w-5 h-5 text-neutral" />
        )}
        <span className={`text-sm ${!feature.included ? 'text-neutral' : ''}`}>
          {feature.text}
          {feature.isNew && (
            <span className="ml-2 text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
              New
            </span>
          )}
          {feature.isPro && (
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              Pro
            </span>
          )}
          {/* {feature.value && (
            <span className="ml-2 text-xs text-neutral">
              ({feature.value})
            </span>
          )} */}
        </span>
      </div>
    ))}
  </div>
);