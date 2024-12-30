import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="border-b border-muted pb-5 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-background-text">
            {title}
          </h1>
          {subtitle && <p className="mt-2 text-sm leading-6 text-background-text max-w-2xl">
            {subtitle}
          </p>}
        </div>
        <div className="hidden md:block h-8 w-px bg-muted mx-4" />
        <div className="mt-4 md:mt-0">
          <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20">
            Next Generation AI
          </span>
        </div>
      </div>
    </div>
  );
};
