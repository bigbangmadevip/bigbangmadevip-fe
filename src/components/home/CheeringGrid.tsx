import { getCheeringIcon } from '@/constants/cheering';
import type { CheeringItem } from '@/types/home';
import { CheeringCard } from './CheeringCard';

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
  return (
    <div className="grid grid-cols-3 gap-x-[12px] gap-y-[32px]">
      {items.map((item) => {
        const completed = item.completed || completedIds.includes(item.id);

        return (
          <CheeringCard
            key={item.id}
            title={item.title}
            iconSrc={getCheeringIcon(item.category, completed)}
            iconAlt={''}
            completed={completed}
            onParticipate={() => onParticipate(item.id)}
          />
        );
      })}
    </div>
  );
}
