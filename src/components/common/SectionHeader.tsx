import React from 'react';
import { MdFilterList } from 'react-icons/md';  // Import filter icon

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  filter?: string;
  onFilterChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  subtitle, 
  filter, 
  onFilterChange 
}) => {
  return (
    <div className="border-b border-muted pb-3 md:pb-5 mb-4 md:mb-8">
      <div className="flex flex-col gap-3 md:gap-0 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1 md:space-y-2">
          <h1 className="text-lg md:text-xl font-medium tracking-tight text-background-text">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm leading-5 md:leading-6 text-background-text/80 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        {filter && onFilterChange && (
          <div className="flex items-center mt-2 md:mt-0">
            <MdFilterList className="h-4 w-4 md:h-5 md:w-5 text-background-text mr-2" />
            <select 
              id="filter" 
              value={filter} 
              onChange={onFilterChange} 
              className="bg-background text-background-text border-muted rounded-md 
                       px-2 md:px-3 py-1 md:py-1.5 text-sm md:text-sm w-32 md:w-auto
                       focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent 
                       hover:border-accent transition-colors duration-200"
            >
              <option value="all">All</option>
              <option value="effects">Effects</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};
