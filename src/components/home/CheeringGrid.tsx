import { useState } from 'react';
import { getCheeringIcon } from '@/constants/cheering';
import type { CheeringItem } from '@/types/home';
import { CheeringCard } from './CheeringCard';
import ArrowDown from '@/assets/line/arrow-down.svg';

const DEFAULT_VISIBLE_COUNT = 6;

interface CheeringGridProps {
  items: CheeringItem[];
  completedIds: string[];
  onParticipate: (id: string) => void;
}

export default function CheeringGrid({
  items,
  completedIds,
  onParticipate,
}: CheeringGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const remainingCount = Math.max(items.length - DEFAULT_VISIBLE_COUNT, 0);
  const visibleItems = isExpanded
    ? items
    : items.slice(0, DEFAULT_VISIBLE_COUNT);

  return (
    <div
      className={`bg-secondary-900 p-[16px] rounded-[16px] ${remainingCount > 0 && !isExpanded ? 'pb-[20px]' : 'pb-[24px]'}`}
    >
      <div className="grid grid-cols-3 gap-x-[12px] gap-y-[32px]">
        {visibleItems.map((item) => {
          const completed = item.completed || completedIds.includes(item.id);

          return (
            <CheeringCard
              key={item.id}
              title={item.title}
              iconSrc={getCheeringIcon(item.category, completed)}
              iconAlt=""
              completed={completed}
              onParticipate={() => onParticipate(item.id)}
            />
          );
        })}
      </div>

      {remainingCount > 0 && !isExpanded && (
        <div className="mt-[20px] pt-[16px] border-t border-secondary-800">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-[6px] text-body-13 font-medium text-secondary-300"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(true)}
          >
            <ArrowDown className="w-[20px] h-[20px] text-secondary-300" />
            {remainingCount}개 더 보기
          </button>
        </div>
      )}
    </div>
  );
}
