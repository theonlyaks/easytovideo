import { forwardRef, useState, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import {SelectProps } from '@/types';

const joinClasses = (...classes: (string | boolean | undefined)[]) => 
  classes.filter(Boolean).join(' ');

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = 'Select...', className, disabled }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div ref={selectRef} className="relative w-full">
        <div
          ref={ref}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={joinClasses(
            'flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm cursor-pointer',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <span className={!selectedOption ? 'text-gray-400' : ''}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <IoChevronDown className={joinClasses('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
