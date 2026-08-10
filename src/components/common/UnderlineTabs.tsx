'use client';

import { cn } from '@/lib/utils';

export interface UnderlineTab<T extends string | number> {
  id: T;
  label: string;
}

interface UnderlineTabsProps<T extends string | number> {
  tabs: readonly UnderlineTab<T>[];
  value: T;
  onChange: (value: T) => void;
  idPrefix: string;
  panelIdPrefix: string;
  className?: string;
}

export function UnderlineTabs<T extends string | number>({
  tabs,
  value,
  onChange,
  idPrefix,
  panelIdPrefix,
  className,
}: UnderlineTabsProps<T>) {
  return (
    <div
      className={cn('-mx-5 border-b-2 border-[#555555]', className)}
    >
      <div className="flex h-[44px] items-center" role="tablist">
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
              className={`flex h-[44px] flex-1 items-center justify-center pt-[10px] pb-[16px] text-body-14 ${
                isActive
                  ? '-mb-[2px] border-b-2 border-secondary-1 font-bold text-secondary-1'
                  : 'font-normal text-[#777777]'
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
