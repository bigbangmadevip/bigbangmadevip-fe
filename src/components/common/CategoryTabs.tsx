'use client';

import { cn } from '@/lib/utils';

export interface CategoryTab<T extends string> {
  id: T;
  label: string;
}

interface CategoryTabsProps<T extends string> {
  tabs: readonly CategoryTab<T>[];
  value: T;
  onChange: (value: T) => void;
  idPrefix: string;
  panelIdPrefix: string;
  className?: string;
}

export function CategoryTabs<T extends string>({
  tabs,
  value,
  onChange,
  idPrefix,
  panelIdPrefix,
  className,
}: CategoryTabsProps<T>) {
  return (
    <div
      className={cn(
        'scrollbar-hidden overflow-x-auto px-5 overscroll-x-contain',
        className,
      )}
    >
      <div className="flex w-max gap-[8px]" role="tablist">
        {tabs.map((tab) => {
          const isActive = value === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              id={`${idPrefix}-${tab.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${panelIdPrefix}-${tab.id}`}
              onClick={() => onChange(tab.id)}
              className={`shrink-0 rounded-[6px] px-[14px] py-[8px] text-body-12 ${
                isActive
                  ? 'bg-secondary-1 font-bold text-secondary-950'
                  : 'bg-secondary-800 font-normal text-secondary-400'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
