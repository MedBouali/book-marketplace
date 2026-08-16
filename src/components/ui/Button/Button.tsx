import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'rounded-sm px-4 py-2 font-medium text-sm transition-colors cursor-pointer',
        'focus-visible:outline-none',
        {
          'bg-emerald-800 text-white hover:emerald-900': variant === 'primary',
          'bg-emerald-800/10 text-emerald-900 hover:bg-emerald-800/20': variant === 'secondary',
          'border border-emerald-800 bg-white text-emerald-800 hover:bg-emerald-800 hover:text-white':
            variant === 'outline',
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
