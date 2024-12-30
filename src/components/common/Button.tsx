import { ButtonProps } from '@/types';
import {
  BUTTON_BASE_STYLES,
  BUTTON_VARIANTS,
  BUTTON_SIZES,
  BUTTON_ICON_SIZES
} from '@/constants';
import { LoadingSpinner } from './LoadingSpinner';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  iconOnly = false,
  isRound = false,  // Add new prop with default value
  children,
  className = '',
  disabled,
  customLoadingText='Loading...',  // Add new prop with default value
  ...props
}) => {
  const renderIcon = () => {
    if (!Icon) return null;
    return <Icon className={BUTTON_ICON_SIZES[size]} />;
  };

  const renderContent = () => {
    if (isLoading) {
      if (iconOnly) {
        return <LoadingSpinner size={size} iconOnly />;
      }
      return (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={size} />
          {customLoadingText}
        </div>
      );
    }

    if (iconOnly) {
      return renderIcon();
    }

    return (
      <>
        {iconPosition === 'left' && Icon && (
          <span className="mr-2">{renderIcon()}</span>
        )}
        {children}
        {iconPosition === 'right' && Icon && (
          <span className="ml-2">{renderIcon()}</span>
        )}
      </>
    );
  };

  return (
    <button
      className={`
        ${BUTTON_BASE_STYLES}
        ${BUTTON_VARIANTS[variant]}
        ${iconOnly ? BUTTON_SIZES[size].iconOnly : BUTTON_SIZES[size].normal}
        ${iconOnly ? 'aspect-square' : ''}
        ${isRound ? 'rounded-full' : 'rounded-lg'}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};

export default Button;