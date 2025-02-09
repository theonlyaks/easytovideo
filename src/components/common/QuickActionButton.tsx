import React from 'react';
import { QuickActionButtonProps } from '@/types';

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  icon, 
  label, 
  description, 
  onClick 
}) => (
  <button
    onClick={onClick}
    className="relative flex flex-col items-center p-4 rounded-lg bg-background 
               border border-muted hover:border-primary hover:bg-primary/5 
               transition-all duration-200 group"
  >
    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary 
                    flex items-center justify-center mb-3 
                    group-hover:bg-primary group-hover:text-background 
                    transition-all duration-200">
      {icon}
    </div>
    <h3 className="text-sm font-medium text-background-text mb-1 
                   group-hover:text-primary transition-colors">
      {label}
    </h3>
    <p className="text-sm text-background-text text-center">{description}</p>
  </button>
);
