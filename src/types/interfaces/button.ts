import { IconType } from 'react-icons';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '@/constants';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
  isLoading?: boolean;
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  isRound?: boolean;  
  children?: React.ReactNode;
  customLoadingText?: string;
}
