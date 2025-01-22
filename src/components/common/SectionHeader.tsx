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
         {/* <div className="mt-4 md:mt-0">
          <span className="inline-flex items-center rounded-md bg-accent/10 px-2 py-1 text-xs font-medium text-accent ring-1 ring-inset ring-accent/20">
            Next Generation AI
          </span>
        </div> */}
        <div className="hidden md:block h-8 w-px bg-muted mx-4" />
        {filter && onFilterChange && (
          <div className="flex items-center">
            <MdFilterList className="h-5 w-5 text-background-text mr-2" />
            <select 
              id="filter" 
              value={filter} 
              onChange={onFilterChange} 
              className="bg-background text-background-text border-muted rounded-md px-3 py-1.5 text-sm 
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
