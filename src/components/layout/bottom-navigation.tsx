'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: '홈', href: '/', icon: 'home' },
  { label: '음원', href: '/music', icon: 'music' },
  { label: '투표', href: '/vote', icon: 'vote' },
  { label: '일정', href: '/schedule', icon: 'schedule' },
  { label: '마이', href: '/mypage', icon: 'mypage' },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] bg-secondary-950 text-secondary-1 pb-[30px] pt-[12px] border-t border-t-[rgba(255,255,255,0.08)]">
      <div className="grid h-16 grid-cols-5 items-center text-center">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex h-full flex-col items-center justify-center gap-[4px]"
              aria-current={isActive ? 'page' : undefined}
            >
              <Image
                src={`/icon/navigation/${tab.icon}-${isActive ? 'active' : 'default'}.svg`}
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
              />
              <span
                className={`text-caption-10 ${isActive ? 'text-secondary-1' : 'text-secondary-400'}`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
