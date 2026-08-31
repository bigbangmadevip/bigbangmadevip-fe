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
  variant?: 'default' | 'schedule';
}

const NavigationListItem = ({
  icon,
  title,
  time,
  platform,
  href,
  variant = 'default',
}: NavigationListItemProps) => {
  return (
    <>
      <Link href={href} className="shrink-0">
        <div
          className={`flex items-center justify-between gap-[12px] rounded-[16px] p-[16px] ${
            variant === 'schedule' ? 'bg-[#333333]' : 'bg-[#1B1B1B]'
          }`}
        >
          <div className="flex min-w-0 flex-1 flex-row items-center gap-[12px]">
            <div
              className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] ${
                variant === 'schedule' ? 'bg-secondary-700' : 'bg-secondary-800'
              }`}
            >
              {icon && (
                <Image
                  src={`/icon/${icon}.svg`}
                  alt={icon}
                  width={28}
                  height={28}
                />
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
              <p className="line-clamp-1 text-body-15 font-bold">{title}</p>
              <div className="flex min-w-0 items-center text-body-14 text-secondary-300">
                <span className="flex shrink-0 items-center gap-[2px]">
                  <Image
                    src="/icon/line/clock_gray-16.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="h-[16px] w-[16px] shrink-0"
                  />
                  <span>{time}</span>
                </span>
                <span className="shrink-0 px-[6px] font-bold text-secondary-700">
                  |
                </span>
                <span className="min-w-0 truncate">{platform}</span>
              </div>
            </div>
          </div>
          <Image
            src={'/icon/line/arrow-right_gray-24.svg'}
            alt="arrowIconGray"
            width={24}
            height={24}
          />
        </div>
      </Link>
    </>
  );
};

export default NavigationListItem;
