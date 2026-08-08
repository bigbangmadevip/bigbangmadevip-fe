'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface NavigationListItemProps {
  id?: string;
  icon: string;
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
      <div className="flex p-[16px] justify-between items-center rounded-[16px] bg-[#1B1B1B]">
        <div className="flex flex-row gap-[12px] items-center">
          <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[12px] bg-secondary-800">
            <Image
              src={`/icon/${icon}-yellow.svg`}
              alt={icon}
              width={28}
              height={28}
            />
          </div>
          <div>
            <p className="text-body-15 font-bold">{title}</p>
            <span className="text-body-13 text-secondary-400">{time} 예정</span>
            <span className="text-body-13 px-[6px] font-bold text-secondary-700">
              |
            </span>
            <span className="text-body-13 text-secondary-400">{platform}</span>
          </div>
        </div>

        <Link href={href}>
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
