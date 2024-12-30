import { forwardRef, useState, useRef, useEffect } from 'react';
import { IoChevronDown, IoPlay, IoPause } from 'react-icons/io5';
import { SelectWithPlayProps } from '@/types';

export const SelectWithPlay = forwardRef<HTMLDivElement, SelectWithPlayProps>(
  ({ options, value, onChange, placeholder = 'Select...', className, disabled }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const selectRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }, []);

    const handlePlay = (url: string, id: string) => {
      if (playingId === id) {
        audioRef.current?.pause();
        setPlayingId(null);
      } else {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        audioRef.current = new Audio(url);
        audioRef.current.play();
        setPlayingId(id);
        audioRef.current.onended = () => setPlayingId(null);
      }
    };

    return (
      <div ref={selectRef} className="relative w-full">
        <div
          ref={ref}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          } ${className || ''}`}
        >
          <span className={!selectedOption ? 'text-gray-400' : ''}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <IoChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border rounded-md shadow-lg">
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray-100"
              >
                <span
                  className="flex-grow cursor-pointer"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </span>
                {option.url && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlay(option.url, option.value);
                    }}
                    className="p-1 ml-2 text-gray-600 hover:text-gray-900"
                  >
                    {playingId === option.value ? (
                      <IoPause className="w-4 h-4" />
                    ) : (
                      <IoPlay className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);

SelectWithPlay.displayName = 'SelectWithPlay';
