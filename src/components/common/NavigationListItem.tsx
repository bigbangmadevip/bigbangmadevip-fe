'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface NavigationListItemProps {
  id?: string;
  icon?: string;
  title: string;
  time: string;
  platform: string;
  href: string;
}

const NavigationListItem = ({
  icon,
  title,
  time,
  platform,
  href,
}: NavigationListItemProps) => {
  return (
    <>
      <div className="flex items-center justify-between gap-[12px] rounded-[16px] bg-[#1B1B1B] p-[16px]">
        <div className="flex min-w-0 flex-1 flex-row items-center gap-[12px]">
          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-secondary-800">
            {icon && (
              <Image
                src={`/icon/${icon}-yellow.svg`}
                alt={icon}
                width={28}
                height={28}
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-body-15 font-bold">{title}</p>
            <span className="text-body-13 text-secondary-400">{time} 예정</span>
            <span className="text-body-13 px-[6px] font-bold text-secondary-700">
              |
            </span>
            <span className="text-body-13 text-secondary-400">{platform}</span>
          </div>
        </div>

        <Link href={href} className="shrink-0">
          <Image
            src={'/icon/arrow-right_gray-24.svg'}
            alt="arrowIconGray"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </>
  );
};

export default NavigationListItem;
