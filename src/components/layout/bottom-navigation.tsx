'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: '홈', href: '/' },
  { label: '음원', href: '/music' },
  { label: '투표', href: '/vote' },
  { label: '일정', href: '/schedule' },
  { label: '마이', href: '/mypage' },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] pb-[env(safe-area-inset-bottom)] bg-secondary-950 text-secondary-1">
      {' '}
      <div className="grid h-16 grid-cols-5 items-center text-center">
        {tabs.map((tab) => {
          const isActive =
            tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
