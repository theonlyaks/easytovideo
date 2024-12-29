export const BUTTON_BASE_STYLES = 'font-medium transition-colors duration-200 focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center';

export const BUTTON_VARIANTS = {
 primary: 'bg-primary text-secondary-text hover:bg-[#d86b50] focus:ring-primary',
 secondary: 'bg-secondary text-secondary-text hover:bg-[#2d2f43] focus:ring-secondary',
 outline: 'border-2 border-primary text-primary hover:bg-[#fdf1ee] focus:ring-primary',
 accent: 'bg-accent text-accent-text hover:bg-[#6d9782] focus:ring-accent'
} as const;

export const BUTTON_SIZES = {
 sm: {
   normal: 'px-3 py-1.5 text-sm',
   iconOnly: 'p-1.5'
 },
 md: {
   normal: 'px-4 py-2 text-base',
   iconOnly: 'p-2'
 },
 lg: {
   normal: 'px-6 py-3 text-lg',
   iconOnly: 'p-3'
 }
} as const;

export const BUTTON_ICON_SIZES = {
 sm: 'h-4 w-4',
 md: 'h-5 w-5',
 lg: 'h-6 w-6'
} as const;