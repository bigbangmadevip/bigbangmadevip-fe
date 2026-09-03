'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CategoryBadge } from '@/components/common/CategoryBadge';
import type { CategoryBadgeType } from '@/constants/category-badge';
import VotePlatformIcon from './VotePlatformIcon';

export interface DeadlineVoteListItemProps {
  id?: string;
  category: CategoryBadgeType;
  remainingTime: string;
  title: string;
  platform: string;
  iconPlatform?: string;
  imageUrl?: string | null;
  href: string;
}

export default function DeadlineVoteListItem({
  category,
  remainingTime,
  title,
  platform,
  iconPlatform,
  imageUrl,
  href,
}: DeadlineVoteListItemProps) {
  return (
    <Link href={href} aria-label={`${title} 상세 보기`}>
      <article className="border-b border-secondary-800 pb-[20px] last:border-0">
        <div className="mb-[16px] flex justify-between">
          <CategoryBadge category={category} />
          <p className="text-body-13 font-regular text-accent-red">
            <span className="tracking-[0.02em]">
              <strong>{remainingTime}</strong>
            </span>{' '}
            남음
          </p>
        </div>

        <div className="flex items-center justify-between gap-[19px]">
          <div className="flex min-w-0 items-center gap-[12px]">
            <VotePlatformIcon
              platform={iconPlatform ?? platform}
              imageUrl={imageUrl}
            />
            <div className="min-w-0">
              <p className="line-clamp-1 text-body-15 font-bold">{title}</p>
              <p className="mt-[4px] text-body-13 text-[#777777]">{platform}</p>
            </div>
          </div>

          <Image
            src="/icon/line/arrow-right_gray-24.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
        </div>
      </article>
    </Link>
  );
}
