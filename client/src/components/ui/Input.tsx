import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-[var(--color-on-surface-variant)]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)] px-4 py-2.5 rounded-lg 
        ghost-border border-b-2 border-b-transparent
        focus:outline-none focus:border-b-[var(--color-primary)] focus:[box-shadow:0_0_2px_var(--color-primary)]
        transition-all duration-200 placeholder:text-[var(--color-outline-variant)] 
        ${error ? 'border-b-red-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
});

Input.displayName = 'Input';
