'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import HomeActiveIcon from '@/assets/navigation/home-active.svg';
import HomeDefaultIcon from '@/assets/navigation/home-default.svg';
import MusicActiveIcon from '@/assets/navigation/music-active.svg';
import MusicDefaultIcon from '@/assets/navigation/music-default.svg';
import MyPageActiveIcon from '@/assets/navigation/mypage-active.svg';
import MyPageDefaultIcon from '@/assets/navigation/mypage-default.svg';
import ScheduleActiveIcon from '@/assets/navigation/schedule-active.svg';
import ScheduleDefaultIcon from '@/assets/navigation/schedule-default.svg';
import VoteActiveIcon from '@/assets/navigation/vote-active.svg';
import VoteDefaultIcon from '@/assets/navigation/vote-default.svg';
import { LoginRequiredDialog } from '@/components/common/LoginRequiredDialog';
import { useCurrentUserQuery } from '@/hooks/queries/useAuthQuery';

const tabs = [
  {
    label: '홈',
    href: '/',
    ActiveIcon: HomeActiveIcon,
    DefaultIcon: HomeDefaultIcon,
  },
  {
    label: '음원',
    href: '/music',
    ActiveIcon: MusicActiveIcon,
    DefaultIcon: MusicDefaultIcon,
  },
  {
    label: '투표',
    href: '/vote',
    ActiveIcon: VoteActiveIcon,
    DefaultIcon: VoteDefaultIcon,
  },
  {
    label: '일정',
    href: '/schedule',
    ActiveIcon: ScheduleActiveIcon,
    DefaultIcon: ScheduleDefaultIcon,
  },
  {
    label: '마이',
    href: '/mypage',
    ActiveIcon: MyPageActiveIcon,
    DefaultIcon: MyPageDefaultIcon,
  },
];

export function BottomNavigation() {
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const navigation = navigationRef.current;
    const layout = navigation?.parentElement;
    if (!navigation || !layout) return;

    // 탭 높이가 변경되어도 공유 버튼과의 간격은 24px로 유지합니다.
    const updateSharePosition = () => {
      layout.style.setProperty(
        '--floating-share-bottom',
        `${navigation.getBoundingClientRect().height + 24}px`,
      );
    };
    updateSharePosition();
    const observer = new ResizeObserver(updateSharePosition);
    observer.observe(navigation);
    return () => {
      observer.disconnect();
      layout.style.removeProperty('--floating-share-bottom');
    };
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const {
    data: currentUser,
    isPending: isAuthPending,
    refetch: refetchCurrentUser,
  } = useCurrentUserQuery();
  const isSchedulePage = pathname.startsWith('/schedule');

  const handleMyPageClick = async (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    let user = currentUser;

    // OAuth 로그인 후 PWA 컨텍스트에 남아 있을 수 있는 게스트 캐시를 갱신한다.
    if (isAuthPending || !user) {
      const result = await refetchCurrentUser();
      user = result.data;
    }

    if (!user) {
      setIsLoginDialogOpen(true);
      return;
    }

    router.push('/mypage');
  };

  return (
    <>
      <nav
        ref={navigationRef}
        className={`fixed inset-x-0 bottom-0 z-50 mx-auto w-full max-w-[430px] border-t pb-[30px] pt-[12px] text-secondary-1 ${
          isSchedulePage
            ? 'border-secondary-700 bg-secondary-800'
            : 'border-[rgba(255,255,255,0.08)] bg-secondary-950'
        }`}
      >
        <div className="grid grid-cols-5 items-center text-center">
          {tabs.map((tab) => {
            const isActive =
              tab.href === '/'
                ? pathname === '/'
                : pathname.startsWith(tab.href);
            const Icon = isActive ? tab.ActiveIcon : tab.DefaultIcon;

            return (
              <Link
                prefetch={false}
                key={tab.href}
                href={tab.href}
                onClick={tab.href === '/mypage' ? handleMyPageClick : undefined}
                className="flex h-full flex-col items-center justify-center gap-[4px]"
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon aria-hidden="true" className="h-[28px] w-[28px]" />
                <span
                  className={`text-body-11 ${isActive ? 'text-secondary-1' : 'text-secondary-400'}`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <LoginRequiredDialog
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
        title="로그인 후 이용할 수 있어요."
        description="로그인하고 내 응원 기록을 확인해보세요."
      />
    </>
  );
}
