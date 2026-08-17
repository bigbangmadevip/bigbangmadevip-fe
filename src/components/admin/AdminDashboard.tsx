'use client';

import Image from 'next/image';
import Link from 'next/link';
import AdminBottomNavigation from '@/components/admin/AdminBottomNavigation';

type AdminType = 'music' | 'vote';

type AdminNotice = {
  id: number;
  message: string;
  timeAgo: string;
};

type AdminDashboardProps = {
  adminType: AdminType;
};

const ADMIN_NOTICE: Record<AdminType, AdminNotice[]> = {
  music: [
    {
      id: 1,
      message: '멜론 다운로드 총공이 30분 후 시작됩니다',
      timeAgo: '8분 전',
    },
    {
      id: 2,
      message: '음총 공지가 오늘 18:00 게시 예정입니다',
      timeAgo: '30분 전',
    },
    {
      id: 3,
      message: '스포티파이 총공 푸시 발송 시간이 10분 남았습니다',
      timeAgo: '3시간 전',
    },
    {
      id: 4,
      message: '긴급 공지 예약 게시에 실패했습니다',
      timeAgo: '7시간 전',
    },
  ],
  vote: [
    {
      id: 1,
      message: '벅스 아티스트 투표 총공이 30분 후 시작됩니다',
      timeAgo: '8분 전',
    },
    {
      id: 2,
      message: '투총 공지가 오늘 18:00 게시 예정입니다',
      timeAgo: '30분 전',
    },
    {
      id: 3,
      message: '하이어 총공 푸시 발송 시간이 10분 남았습니다',
      timeAgo: '3시간 전',
    },
    {
      id: 4,
      message: '긴급 공지 예약 게시에 실패했습니다',
      timeAgo: '7시간 전',
    },
  ],
};

const MANAGEMENT_STATS = [
  { label: '진행 중', value: 3 },
  { label: '진행 예약', value: 5 },
  { label: '임시 저장', value: 1 },
];

const NOTICE_STATS = [
  { label: '게시 중', value: 53 },
  { label: '작성 예약', value: 2 },
  { label: '임시 저장', value: 8 },
];

function AdminSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[12px] flex items-center justify-between">
      <h2 className="text-title-15 font-bold text-secondary-1">{children}</h2>
      <button
        type="button"
        className="flex items-center gap-[2px] text-body-11 text-secondary-300"
      >
        전체 보기
        <Image
          src="/icon/line/arrow-right_gray-18.svg"
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

function StatsCard({ stats }: { stats: typeof MANAGEMENT_STATS }) {
  return (
    <div className="grid grid-cols-3 rounded-[16px] bg-secondary-900 px-[8px] py-[16px]">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={`flex flex-col items-center justify-center gap-[6px] py-[4px] ${
            index > 0 ? 'border-l border-secondary-800' : ''
          }`}
        >
          <span className="text-body-11 text-secondary-400">{stat.label}</span>
          <p className="font-suit text-[30px] font-light leading-none text-secondary-1">
            {stat.value}
            <span className="ml-[3px] font-sans text-body-11 font-normal text-secondary-300">
              건
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard({ adminType }: AdminDashboardProps) {
  const managementTitle = adminType === 'music' ? '음원총공 관리' : '투표총공 관리';
  const registerTitle = adminType === 'music' ? '음원총공 등록' : '투표총공 등록';
  const registerIcon = adminType === 'music' ? '🎹' : '🗳️';

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

        <h1 className="whitespace-pre-line text-[22px] font-light leading-[1.45] tracking-[-0.04em] text-secondary-100">
          {'안녕하세요!\n오늘 운영 현황을 확인해보세요 👑'}
        </h1>

        <section className="mt-[36px]">
          <AdminSectionTitle>운영 알림</AdminSectionTitle>
          <div className="rounded-[16px] bg-secondary-900 px-[16px]">
            {ADMIN_NOTICE[adminType].map((notice, index) => (
              <div
                key={notice.id}
                className={`py-[14px] ${
                  index > 0 ? 'border-t border-secondary-800' : ''
                }`}
              >
                <p className="text-body-11 font-medium text-secondary-100">
                  ‘{notice.message}’
                </p>
                <span className="mt-[6px] block text-caption-10 text-secondary-500">
                  {notice.timeAgo}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-[32px]">
          <AdminSectionTitle>{managementTitle}</AdminSectionTitle>
          <StatsCard stats={MANAGEMENT_STATS} />
        </section>

        <section className="mt-[32px]">
          <AdminSectionTitle>공지 관리</AdminSectionTitle>
          <StatsCard stats={NOTICE_STATS} />
        </section>

        <section className="mt-[32px]">
          <h2 className="mb-[12px] text-title-15 font-bold text-secondary-1">
            빠른 등록
          </h2>
          <div className="grid grid-cols-2 gap-[8px]">
            <button
              type="button"
              className="flex h-[100px] flex-col items-center justify-center gap-[8px] rounded-[16px] border border-secondary-800 bg-secondary-900"
            >
              <span aria-hidden="true" className="text-[22px]">
                {registerIcon}
              </span>
              <span className="text-body-12 font-bold text-secondary-1">
                {registerTitle}
              </span>
            </button>
            <button
              type="button"
              className="flex h-[100px] flex-col items-center justify-center gap-[8px] rounded-[16px] border border-secondary-800 bg-secondary-900"
            >
              <span aria-hidden="true" className="text-[22px]">
                ✏️
              </span>
              <span className="text-body-12 font-bold text-secondary-1">
                공지 등록
              </span>
            </button>
          </div>
        </section>
      </main>

      <AdminBottomNavigation adminType={adminType} />
    </>
  );
}
