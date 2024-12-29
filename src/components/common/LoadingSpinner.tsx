// components/LoadingSpinner/index.tsx
import { BUTTON_ICON_SIZES } from '@/constants';

interface LoadingSpinnerProps {
  size?: keyof typeof BUTTON_ICON_SIZES;
  iconOnly?: boolean;
}

export const LoadingSpinner = ({ size = 'md', iconOnly = false }: LoadingSpinnerProps) => {
  return (
    <svg 
      className={`animate-spin ${iconOnly ? BUTTON_ICON_SIZES[size] : 'h-5 w-5 mr-2'}`}
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
};