'use client';

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
    <div className="flex p-[16px] justify-between items-center rounded-[16px] bg-[#1B1B1B]">
      <div>{icon}</div>
      <div>
        <p>{title}</p>
        <p>
          {time} 예정 | {platform}
        </p>
      </div>
      <Link href={href}>{'>'}</Link>
    </div>
  );
};

export default NavigationListItem;
