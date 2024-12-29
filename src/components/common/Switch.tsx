// components/common/Switch.tsx
import { SwitchProps } from '@/types';
import { SWITCH_BASE_STYLES, SWITCH_SIZES } from '@/constants';

export const Switch: React.FC<SwitchProps> = ({
    checked,
    onChange,
    size = 'md',
    disabled = false,
    className = ''
}) => {
    const sizeConfig = SWITCH_SIZES[size];
  
    return (
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          ${SWITCH_BASE_STYLES}
          ${sizeConfig.container}
          ${checked ? 'bg-primary' : 'bg-background'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          rounded-full
          ${className}
        `}
        disabled={disabled}
      >
        <span
          className={`
            ${sizeConfig.thumb}
            transform transition-transform duration-200 ease-in-out
            ${checked ? sizeConfig.translate : 'translate-x-0.5'}
            bg-white rounded-full shadow-md
            absolute
          `}
        />
      </button>
    );
};