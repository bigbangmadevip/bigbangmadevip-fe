'use client';

import Link from 'next/link';
import { CategoryBadge } from '@/components/common/CategoryBadge';
import type { CategoryBadgeType } from '@/constants/category-badge';

export interface VoteListItemProps {
  id?: string;
  category: CategoryBadgeType;
  deadLine: string;
  icon: string;
  title: string;
  platform: string;
  href: string;
}

const VoteListItem = ({
  category,
  deadLine,
  icon,
  title,
  platform,
  href,
}: VoteListItemProps) => {
  return (
    <div className="pb-[20px] border-b border-secondary-800 last:border-0">
      <div className="flex justify-between mb-[16px]">
        <CategoryBadge category={category} />
        <p className="text-body-12 font-medium text-accent-red">
          {deadLine} 남음
        </p>
      </div>
      <div className="flex justify-between items-center gap-[19px]">
        <div className="flex justify-between items-center gap-[12px]">
          <div className="h-[50px] w-[50px] rounded-[12px] bg-secondary-1">
            {icon}
          </div>
          <div className="flex flex-col gap-[4px]">
            <p className="text-body-15 font-bold line-clamp-1">{title}</p>
            <p className="text-body-13 text-[#777777]">{platform}</p>
          </div>
        </div>
        <Link href={href}>{'>'}</Link>
      </div>
    </div>
  );
};

export default VoteListItem;
