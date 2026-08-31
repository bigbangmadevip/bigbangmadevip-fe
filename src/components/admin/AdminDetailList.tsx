'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  updateAdminMusicDetail,
  updateAdminVoteDetail,
} from '@/apis/admin-detail';
import { AppDialog } from '@/components/common/AppDialog';
import { CategoryTabs } from '@/components/common/CategoryTabs';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ADMIN_DETAIL_QUERY_KEYS,
  useAdminMusicDetailsQuery,
  useAdminVoteDetailsQuery,
} from '@/hooks/queries/useAdminDetailQuery';
import type { AdminMusicDetail, AdminVoteDetail } from '@/types/admin-detail';

type AdminDetailListProps = {
  adminType: 'music' | 'vote';
};

type AdminListItem = AdminMusicDetail | AdminVoteDetail;

type DeadlineFilter = 'ongoing' | 'ended';

const DEADLINE_FILTER_TABS = [
  { id: 'ongoing', label: '진행중' },
  { id: 'ended', label: '종료' },
] as const;

export default function AdminDetailList({ adminType }: AdminDetailListProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const musicQuery = useAdminMusicDetailsQuery(adminType === 'music');
  const voteQuery = useAdminVoteDetailsQuery(adminType === 'vote');
  const query = adminType === 'music' ? musicQuery : voteQuery;
  const basePath = adminType === 'music' ? '/musicadmin' : '/voteadmin';
  const menuLabel = adminType === 'music' ? '음총' : '투총';
  const [deadlineFilter, setDeadlineFilter] =
    useState<DeadlineFilter>('ongoing');
  const [referenceTime] = useState(Date.now);
  const [deactivateTarget, setDeactivateTarget] =
    useState<AdminListItem | null>(null);

  const deactivateMutation = useMutation<AdminListItem, Error, AdminListItem>({
    mutationFn: (item: AdminListItem) => {
      if (adminType === 'music') {
        const musicItem = item as AdminMusicDetail;
        return updateAdminMusicDetail(String(musicItem.id), {
          category: musicItem.category,
          title: musicItem.title,
          songName: musicItem.songName,
          platformIds: musicItem.platformIds,
          eventStartAt: musicItem.eventStartAt,
          eventEndAt: musicItem.eventEndAt,
          checklist: musicItem.checklist,
          imageUrls: musicItem.imageUrls,
          guideIds: musicItem.guideIds ?? [],
          menuUrgent: musicItem.menuUrgent,
          urgentContent: musicItem.urgentContent,
          active: false,
          scheduledAt: musicItem.scheduledAt,
          pushEnabled: musicItem.pushEnabled ?? false,
          pushSendAt: musicItem.pushSendAt ?? null,
          pushTitle: musicItem.pushTitle ?? null,
          pushBody: musicItem.pushBody ?? null,
        });
      }

      const voteItem = item as AdminVoteDetail;
      return updateAdminVoteDetail(String(voteItem.id), {
        category: voteItem.category,
        title: voteItem.title,
        musicShowId: voteItem.musicShowId,
        rewardDescription: voteItem.rewardDescription,
        platformIds: voteItem.platformIds,
        platformUrl: Array.isArray(voteItem.platformUrl)
          ? voteItem.platformUrl
          : voteItem.platformUrl ? [voteItem.platformUrl] : [],
        eventStartAt: voteItem.eventStartAt,
        eventEndAt: voteItem.eventEndAt,
        checklist: voteItem.checklist,
        imageUrls: voteItem.imageUrls,
        guideIds: voteItem.guideIds ?? [],
        ctaButtonLabel: voteItem.ctaButtonLabel,
        menuUrgent: voteItem.menuUrgent,
        urgentContent: voteItem.urgentContent,
        active: false,
        scheduledAt: voteItem.scheduledAt,
        pushEnabled: voteItem.pushEnabled,
        pushSendAt: voteItem.pushSendAt,
        pushTitle: voteItem.pushTitle,
        pushBody: voteItem.pushBody,
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          adminType === 'music'
            ? ADMIN_DETAIL_QUERY_KEYS.music()
            : ADMIN_DETAIL_QUERY_KEYS.vote(),
      });
      setDeactivateTarget(null);
    },
  });

  if (query.isPending) {
    return <LoadingScreen label={`${menuLabel} 목록 불러오는 중`} />;
  }

  const items = (query.data ?? []) as AdminListItem[];
  const filteredItems = items.filter((item) => {
    const endTime = item.eventEndAt
      ? new Date(item.eventEndAt).getTime()
      : null;
    const isEnded = endTime !== null && endTime <= referenceTime;

    return deadlineFilter === 'ended' ? isEnded : !isEnded;
  });

  return (
    <main className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-5 pb-[calc(112px+env(safe-area-inset-bottom))]">
      <PageHeader
        title={`${menuLabel} 총공 관리`}
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

      <CategoryTabs
        tabs={DEADLINE_FILTER_TABS}
        value={deadlineFilter}
        onChange={setDeadlineFilter}
        idPrefix={`${adminType}-admin-deadline-tab`}
        panelIdPrefix={`${adminType}-admin-deadline-panel`}
        className="-mx-5 mt-[20px]"
      />

      {query.isError ? (
        <p className="mt-[80px] text-center text-body-13 text-accent-red">
          목록을 불러오지 못했어요.
        </p>
      ) : filteredItems.length === 0 ? (
        <p className="mt-[80px] text-center text-body-13 text-secondary-500">
          {deadlineFilter === 'ongoing'
            ? '진행 중인 총공이 없어요.'
            : '종료된 총공이 없어요.'}
        </p>
      ) : (
        <ul
          id={`${adminType}-admin-deadline-panel-${deadlineFilter}`}
          role="tabpanel"
          aria-labelledby={`${adminType}-admin-deadline-tab-${deadlineFilter}`}
          className="mt-[20px] flex flex-col gap-[10px]"
        >
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="rounded-[14px] border border-secondary-800 bg-secondary-900 p-[16px]"
            >
              <Link
                href={`${basePath}/details/${item.id}`}
                className="flex items-center justify-between gap-[12px]"
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
                    {deadlineFilter === 'ended' ? (
                      <span className="text-caption-10 text-secondary-500">
                        마감일자가 지난 일정입니다.
                      </span>
                    ) : !item.active ? (
                      <span className="text-caption-10 text-secondary-500">
                        비공개 상태입니다.
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-[8px] truncate text-body-14 font-bold text-secondary-1">
                    {item.title}
                  </p>
                </div>
                <span className="shrink-0 text-[24px] text-secondary-500">
                  ›
                </span>
              </Link>
              {deadlineFilter !== 'ended' && (
                <button
                  type="button"
                  onClick={() => setDeactivateTarget(item)}
                  className="mt-[12px] w-full rounded-[10px] border border-secondary-800 py-[10px] text-body-12 font-bold text-secondary-400"
                >
                  {item.active ? `비공개 처리하기` : `공개 처리하기`}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] bg-secondary-950 px-5 pb-[calc(20px+env(safe-area-inset-bottom))] pt-[12px]">
        <Link
          href={`${basePath}/details/new`}
          className="flex w-full items-center justify-center rounded-[12px] bg-main py-[15px] text-body-14 font-bold text-secondary-950"
        >
          새 총공 일정 등록
        </Link>
      </div>

      <AppDialog
        open={deactivateTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDeactivateTarget(null);
        }}
        title="총공 비공개"
        description={
          deactivateTarget
            ? `"${deactivateTarget.title}" 총공을 비공개할까요?\n비공개하면 사용자에게 더 이상 노출되지 않아요.`
            : undefined
        }
        actions={[
          {
            label: '취소',
            variant: 'secondary',
            onClick: () => setDeactivateTarget(null),
          },
          {
            label: '비공개',
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
