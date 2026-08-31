import {
  CATEGORY_BADGE_CONFIG,
  type CategoryBadgeType,
} from '@/constants/category-badge';
import { cn } from '@/lib/utils';

type CategoryBadgeProps = {
  category: CategoryBadgeType;
};

export function CategoryBadge({ category }: CategoryBadgeProps) {
  const { label, color } = CATEGORY_BADGE_CONFIG[category];

  return (
    <div
      className="inline-flex rounded-[4px] px-[8px] py-[4px] text-body-11 font-bold text-secondary-950"
      style={color ? { backgroundColor: color } : undefined}
    >
      {label}
    </div>
  );
}
