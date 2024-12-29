// components/common/Tooltip.tsx
interface TooltipProps {
    children: React.ReactNode;
    content: string;
    className?: string;
  }
  
  export const Tooltip: React.FC<TooltipProps> = ({ 
    children, 
    content,
    className = ''
  }) => {
    return (
      <div className="relative group inline-block">
        {children}
        <div className={`
          invisible group-hover:visible opacity-0 group-hover:opacity-100
          absolute -top-10 left-1/2 -translate-x-1/2
          px-3 py-2 
          bg-secondary text-secondary-text 
          text-sm font-dm-sans
          rounded-lg
          whitespace-nowrap
          shadow-lg
          transition-all duration-200
          ${className}
        `}>
          {content}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary" />
        </div>
      </div>
    );
  };