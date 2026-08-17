'use client';

import Image from 'next/image';

type AdminType = 'music' | 'vote';

type AdminBottomNavigationProps = {
  adminType: AdminType;
};

export default function AdminBottomNavigation({
  adminType,
}: AdminBottomNavigationProps) {
  const managementLabel = adminType === 'music' ? '음원총공' : '투표';
  const managementIcon = adminType === 'music' ? 'music' : 'vote';

  const items = [
    {
      id: 'home',
      label: '홈',
      iconSrc: '/icon/navigation/home-active.svg',
      active: true,
    },
    {
      id: 'management',
      label: managementLabel,
      iconSrc: `/icon/navigation/${managementIcon}-default.svg`,
      active: false,
    },
    {
      id: 'notice',
      label: '공지',
      iconSrc: '/icon/line/alarm_white-24.svg',
      active: false,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] border-t border-[rgba(255,255,255,0.08)] bg-secondary-950 pb-[calc(12px+env(safe-area-inset-bottom))] pt-[10px]">
      <div className="grid h-[58px] grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="flex flex-col items-center justify-center gap-[3px]"
          >
            <Image
              src={item.iconSrc}
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
              className={item.active ? 'opacity-100' : 'opacity-40'}
            />
            <span
              className={`text-caption-10 ${
                item.active ? 'text-secondary-1' : 'text-secondary-500'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
