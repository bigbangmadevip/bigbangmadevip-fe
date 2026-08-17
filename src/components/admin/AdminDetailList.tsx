'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import {
  useAdminMusicDetailsQuery,
  useAdminVoteDetailsQuery,
} from '@/hooks/queries/useAdminDetailQuery';

type AdminDetailListProps = {
  adminType: 'music' | 'vote';
};

export default function AdminDetailList({ adminType }: AdminDetailListProps) {
  const router = useRouter();
  const musicQuery = useAdminMusicDetailsQuery(adminType === 'music');
  const voteQuery = useAdminVoteDetailsQuery(adminType === 'vote');
  const query = adminType === 'music' ? musicQuery : voteQuery;
  const basePath = adminType === 'music' ? '/musicadmin' : '/voteadmin';
  const menuLabel = adminType === 'music' ? '음총' : '투총';

  if (query.isPending) {
    return <LoadingScreen label={`${menuLabel} 목록 불러오는 중`} />;
  }

  return (
    <main className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-5 pb-[calc(32px+env(safe-area-inset-bottom))]">
      <PageHeader
        title={`${menuLabel} 총공 관리`}
        leftAction={
          <HeaderIconButton label="뒤로가기" align="start" onClick={() => router.back()}>
            <Image src="/icon/line/arrow-left_white-28.svg" alt="" width={28} height={28} />
          </HeaderIconButton>
        }
        rightAction={
          <Link href="/" className="text-body-12 font-bold text-secondary-200">
            홈
          </Link>
        }
      />

      <Link
        href={`${basePath}/details/new`}
        className="mt-[20px] flex w-full items-center justify-center rounded-[12px] bg-main py-[15px] text-body-14 font-bold text-secondary-950"
      >
        새 총공 등록
      </Link>

      {query.isError ? (
        <p className="mt-[80px] text-center text-body-13 text-accent-red">
          목록을 불러오지 못했어요.
        </p>
      ) : query.data.length === 0 ? (
        <p className="mt-[80px] text-center text-body-13 text-secondary-500">
          등록된 총공이 없어요.
        </p>
      ) : (
        <ul className="mt-[20px] flex flex-col gap-[10px]">
          {query.data.map((item) => (
            <li key={item.id}>
              <Link
                href={`${basePath}/details/${item.id}`}
                className="flex min-h-[92px] items-center justify-between gap-[12px] rounded-[14px] border border-secondary-800 bg-secondary-900 p-[16px]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-[6px]">
                    <span className="rounded-[4px] bg-secondary-800 px-[7px] py-[3px] text-caption-10 text-secondary-300">
                      {item.category}
                    </span>
                    {item.menuUrgent && (
                      <span className="rounded-[4px] bg-accent-red px-[7px] py-[3px] text-caption-10 text-secondary-1">
                        긴급
                      </span>
                    )}
                    {!item.active && (
                      <span className="text-caption-10 text-secondary-500">비활성</span>
                    )}
                  </div>
                  <p className="mt-[8px] truncate text-body-14 font-bold text-secondary-1">
                    {item.title}
                  </p>
                  <p className="mt-[4px] text-caption-10 text-secondary-500">
                    ID {item.id} · 정렬 {item.sortOrder}
                  </p>
                </div>
                <span className="shrink-0 text-[24px] text-secondary-500">›</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
