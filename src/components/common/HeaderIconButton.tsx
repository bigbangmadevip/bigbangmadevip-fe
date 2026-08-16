import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeaderIconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  label: string;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
};

export function HeaderIconButton({
  label,
  children,
  align = 'center',
  className,
  type = 'button',
  ...props
}: HeaderIconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        'flex h-[44px] w-[44px] items-center',
        align === 'start' && 'justify-start',
        align === 'center' && 'justify-center',
        align === 'end' && 'justify-end',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
