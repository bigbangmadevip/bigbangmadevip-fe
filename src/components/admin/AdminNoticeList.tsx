'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { updateAdminNotice } from '@/apis/admin-notice';
import { AppDialog } from '@/components/common/AppDialog';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ADMIN_NOTICE_QUERY_KEYS,
  useAdminNoticesQuery,
} from '@/hooks/queries/useAdminNoticeQuery';
import type { AdminNotice } from '@/types/admin-notice';

type AdminNoticeListProps = {
  menuType: 'music' | 'vote';
};

export default function AdminNoticeList({ menuType }: AdminNoticeListProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const query = useAdminNoticesQuery(menuType);
  const basePath = menuType === 'music' ? '/musicadmin' : '/voteadmin';
  const menuLabel = menuType === 'music' ? '음총' : '투총';
  const [deactivateTarget, setDeactivateTarget] = useState<AdminNotice | null>(
    null,
  );

  const deactivateMutation = useMutation({
    mutationFn: (notice: AdminNotice) =>
      updateAdminNotice(menuType, String(notice.id), {
        title: notice.title,
        content: notice.content,
        imageUrls: notice.imageUrls,
        links: notice.links,
        pinned: notice.pinned,
        active: false,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_NOTICE_QUERY_KEYS.all(menuType),
      });
      setDeactivateTarget(null);
    },
  });

  if (query.isPending) {
    return <LoadingScreen label={`${menuLabel} 공지 목록 불러오는 중`} />;
  }

  return (
    <main className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-5 pb-[calc(32px+env(safe-area-inset-bottom))]">
      <PageHeader
        title={`${menuLabel} 공지 관리`}
        leftAction={
          <HeaderIconButton
            label="뒤로가기"
            align="start"
            onClick={() => router.back()}
          >
            <Image
              src="/icon/line/arrow-left_white-28.svg"
              alt=""
              width={28}
              height={28}
            />
          </HeaderIconButton>
        }
        rightAction={
          <Link href="/" className="text-body-12 font-bold text-secondary-200">
            홈
          </Link>
        }
      />

      <Link
        href={`${basePath}/notices/new`}
        className="mt-[20px] flex w-full items-center justify-center rounded-[12px] bg-main py-[15px] text-body-14 font-bold text-secondary-950"
      >
        새 공지 등록
      </Link>

      {query.isError ? (
        <p className="mt-[80px] text-center text-body-13 text-accent-red">
          목록을 불러오지 못했어요.
        </p>
      ) : query.data.length === 0 ? (
        <p className="mt-[80px] text-center text-body-13 text-secondary-500">
          등록된 공지가 없어요.
        </p>
      ) : (
        <ul className="mt-[20px] flex flex-col gap-[10px]">
          {query.data.map((notice) => (
            <li
              key={notice.id}
              className="rounded-[14px] border border-secondary-800 bg-secondary-900 p-[16px]"
            >
              <Link
                href={`${basePath}/notices/${notice.id}`}
                className="flex items-center justify-between gap-[12px]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-[6px]">
                    {notice.pinned && (
                      <span className="rounded-[4px] bg-main px-[7px] py-[3px] text-caption-10 font-bold text-secondary-950">
                        고정
                      </span>
                    )}
                    {!notice.active && (
                      <span className="text-caption-10 text-secondary-500">
                        비활성
                      </span>
                    )}
                  </div>
                  <p className="mt-[8px] truncate text-body-14 font-bold text-secondary-1">
                    {notice.title}
                  </p>
                  <p className="mt-[4px] text-caption-10 text-secondary-500">
                    ID {notice.id}
                  </p>
                </div>
                <span className="shrink-0 text-[24px] text-secondary-500">
                  ›
                </span>
              </Link>
              {notice.active && (
                <button
                  type="button"
                  onClick={() => setDeactivateTarget(notice)}
                  className="mt-[12px] w-full rounded-[10px] border border-secondary-800 py-[10px] text-body-12 font-bold text-secondary-400"
                >
                  비활성화
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <AppDialog
        open={deactivateTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeactivateTarget(null);
        }}
        title="공지 비활성화"
        description={
          deactivateTarget
            ? `"${deactivateTarget.title}" 공지를 비활성화할까요?\n비활성화하면 사용자에게 더 이상 노출되지 않아요.`
            : undefined
        }
        actions={[
          {
            label: '취소',
            variant: 'secondary',
            onClick: () => setDeactivateTarget(null),
          },
          {
            label: '비활성화',
            disabled: deactivateMutation.isPending,
            onClick: () => {
              if (deactivateTarget) deactivateMutation.mutate(deactivateTarget);
            },
          },
        ]}
      />
    </main>
  );
}
