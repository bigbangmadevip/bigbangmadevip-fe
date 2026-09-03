import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeaderProps = {
  title?: ReactNode;
  leftAction?: ReactNode;
  rightAction?: ReactNode;
  sticky?: boolean;
  className?: string;
  titleClassName?: string;
};

export function PageHeader({
  title,
  leftAction,
  rightAction,
  sticky = false,
  className,
  titleClassName,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'grid h-[56px] shrink-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center bg-background',
        sticky && 'sticky top-[env(safe-area-inset-top)] z-40',
        className,
      )}
    >
      <div className="flex min-w-0 justify-self-start">{leftAction}</div>
      <div
        className={cn(
          'min-w-0 max-w-full truncate text-center text-title-17 font-bold text-secondary-1',
          titleClassName,
        )}
      >
        {title}
      </div>
      <div className="flex min-w-0 justify-self-end">{rightAction}</div>
    </header>
  );
}
