import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-sm border px-4 py-2 outline-none',
          'border-gray-300 focus:border-emerald-800',
          error && 'border-red-500 focus:border-red-500',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
