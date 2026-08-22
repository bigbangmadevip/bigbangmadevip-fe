'use client';

import Link from 'next/link';
import AdminBottomNavigation from '@/components/admin/AdminBottomNavigation';

type AdminType = 'music' | 'vote';

type AdminDashboardProps = {
  adminType: AdminType;
};

type AdminAction = {
  label: string;
  href?: string;
};

const ADMIN_ACTIONS: Record<AdminType, AdminAction[]> = {
  music: [
    { label: '총공 일정 등록', href: '/musicadmin/details' },
    { label: '음총 공지 등록', href: '/musicadmin/notices' },
    { label: '원클릭 등록', href: '/musicadmin/streaming-links' },
    {
      label: '스밍리스트 이미지 등록',
      href: '/musicadmin/streaming-image',
    },
  ],
  vote: [
    { label: '총공 일정 등록', href: '/voteadmin/details' },
    { label: '투총 공지 등록', href: '/voteadmin/notices' },
  ],
};

export default function AdminDashboard({ adminType }: AdminDashboardProps) {
  return (
    <>
      <main className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-[20px] pb-[116px]">
        <header className="flex h-[56px] items-center justify-end">
          <Link
            href="/"
            className="rounded-full border border-secondary-700 bg-secondary-900 px-[14px] py-[7px] text-body-12 font-bold text-secondary-100"
          >
            홈
          </Link>
        </header>

        <div className="mt-[24px] flex flex-col gap-[12px]">
          {ADMIN_ACTIONS[adminType].map((action) =>
            action.href ? (
              <Link
                key={action.label}
                href={action.href}
                className="flex w-full items-center justify-center rounded-[16px] border border-secondary-800 bg-secondary-900 px-[20px] py-[20px] text-body-15 font-bold text-secondary-1"
              >
                {action.label}
              </Link>
            ) : (
              <button
                key={action.label}
                type="button"
                className="flex w-full items-center justify-center rounded-[16px] border border-secondary-800 bg-secondary-900 px-[20px] py-[20px] text-body-15 font-bold text-secondary-1"
              >
                {action.label}
              </button>
            ),
          )}
        </div>
      </main>

      <AdminBottomNavigation adminType={adminType} />
    </>
  );
}
