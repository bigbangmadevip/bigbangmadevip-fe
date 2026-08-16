'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppDialog } from '@/components/common/AppDialog';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import NavigationListItem from '@/components/common/NavigationListItem';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionTitle } from '@/components/common/SectionTitle';
import { getPlatformLabel } from '@/constants/platform';
import { useParticipateCheeringMutation } from '@/hooks/mutations/useParticipateCheeringMutation';
import type { HomeResponse } from '@/types/home';
import CheeringGrid from './CheeringGrid';
import { CHEERING_DIALOG_CONFIG } from './constants';

type DialogStep = 'CONFIRM' | 'COMPLETE';

interface HomeContainerProps {
  initialData: HomeResponse;
}

function formatScheduleTime(value: string) {
  const matched = value.match(/T(\d{2}):(\d{2})/);

  return matched ? `${matched[1]}:${matched[2]}` : '';
}

function formatRemainingTime(eventEndAt: string, now: number | null) {
  if (now === null) return '마감 시간 확인 중';

  const remainingMinutes = Math.ceil(
    (new Date(eventEndAt).getTime() - now) / 60_000,
  );

  if (!Number.isFinite(remainingMinutes)) return '마감 정보를 확인해주세요';
  if (remainingMinutes <= 0) return '마감되었어요';

  const days = Math.floor(remainingMinutes / (60 * 24));
  const hours = Math.floor((remainingMinutes % (60 * 24)) / 60);
  const minutes = remainingMinutes % 60;

  if (days > 0) {
    return `${days}일${hours > 0 ? ` ${hours}시간` : ''} 남음`;
  }

  if (hours > 0) {
    return `${hours}시간${minutes > 0 ? ` ${minutes}분` : ''} 남음`;
  }

  return `${minutes}분 남음`;
}

export default function HomeContainer({ initialData }: HomeContainerProps) {
  const [now, setNow] = useState<number | null>(null);
  const [dialogStep, setDialogStep] = useState<DialogStep | null>(null);

  const [selectedCheeringId, setSelectedCheeringId] = useState<string | null>(
    null,
  );

  const participateCheeringMutation = useParticipateCheeringMutation();
  const urgentDetail = initialData.urgentDetail;

  useEffect(() => {
    if (urgentDetail?.menuType !== 'VOTE') return;

    const updateNow = () => setNow(Date.now());
    const initialTimer = window.setTimeout(updateNow, 0);
    const interval = window.setInterval(updateNow, 60_000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [urgentDetail?.eventEndAt, urgentDetail?.menuType]);

  const urgentStatusText =
    urgentDetail?.menuType === 'MUSIC'
      ? '지금 바로 참여해주세요'
      : urgentDetail?.menuType === 'VOTE' && urgentDetail.eventEndAt
        ? `마감까지 ${formatRemainingTime(urgentDetail.eventEndAt, now)}`
        : '마감 정보를 확인해주세요';

  const completedCheeringIds = initialData.cheeringItems
    .filter((item) => item.completed)
    .map((item) => item.id);

  const selectedCheering = initialData.cheeringItems.find(
    (item) => item.id === selectedCheeringId,
  );

  const selectedDialogConfig = selectedCheering
    ? CHEERING_DIALOG_CONFIG[selectedCheering.category]
    : null;

  const currentDialogConfig =
    dialogStep === 'CONFIRM'
      ? selectedDialogConfig?.confirm
      : selectedDialogConfig?.complete;

  const dialogContext = selectedCheering
    ? {
        item: selectedCheering,
        participantCount: initialData.participantCount,
      }
    : null;

  const handleOpenParticipateDialog = (cheeringId: string) => {
    setSelectedCheeringId(cheeringId);
    setDialogStep('CONFIRM');
  };

  const handleCloseDialog = () => {
    setDialogStep(null);
    setSelectedCheeringId(null);
  };

  const handleParticipate = () => {
    if (!selectedCheeringId || participateCheeringMutation.isPending) return;

    participateCheeringMutation.mutate(selectedCheeringId, {
      onSuccess: () => setDialogStep('COMPLETE'),
    });
  };

  return (
    <main>
      <PageHeader
        rightAction={
          <HeaderIconButton label="알림" align="end">
            <Image
              src="/icon/alarm.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </HeaderIconButton>
        }
      />

      {/* HOME TITLE */}
      <div className="mb-[24px] text-title-36 font-extralight">
        <h1>오늘</h1>
        <h1 className="text-main font-bold">
          {initialData.participantCount}명
          <span className="text-secondary-1 font-extralight">의</span>
        </h1>
        <h1>VIP가 움직였어요 👑</h1>
      </div>

      {/* 긴급 안내 배너 */}
      {urgentDetail && (
        <Link
          href={{
            pathname: `/urgent/${urgentDetail.detailId}`,
            query: { menuType: urgentDetail.menuType },
          }}
          className="mb-[40px] block rounded-[16px] border border-main bg-[rgba(255,251,31,0.04)] p-[16px]"
        >
          <p className="mb-[20px] text-body-12 font-medium">
            🚨 놓치면 안되는 VIP 긴급 총공
          </p>
          <div className="flex items-center justify-between gap-[12px]">
            <div className="min-w-0">
              <p className="mb-[2px] line-clamp-2 text-title-17 font-bold">
                {urgentDetail.title}
              </p>

              <div className="flex min-w-0 items-center gap-[2px]">
                {urgentDetail.menuType === 'VOTE' && (
                  <Image
                    src="/icon/time-red.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                    className="shrink-0"
                  />
                )}
                <span className="shrink-0 text-body-13 text-accent-red">
                  {urgentStatusText}
                </span>
                <span className="px-[6px] text-body-13 font-bold text-secondary-300">
                  |
                </span>
                <span className="truncate text-body-13 font-medium text-secondary-300">
                  {urgentDetail.platformNames.map(getPlatformLabel).join(', ')}
                </span>
              </div>
            </div>

            <Image
              src="/icon/arrow-right_yellow-bg.svg"
              alt=""
              width={32}
              height={32}
              aria-hidden="true"
              className="shrink-0"
            />
          </div>
        </Link>
      )}

      {/* 오늘 해야 할 응원 */}
      <div className="mb-[32px]">
        <SectionTitle
          action={
            <div className="flex gap-[1px]">
              <span className="text-body-13 font-bold">
                {initialData.completedCheeringCount}
              </span>

              <span className="text-body-13 text-secondary-300">/</span>

              <span className="text-body-13 text-secondary-300">
                {initialData.totalCheeringCount}
              </span>

              <span className="ml-[3px] text-body-13 text-secondary-400">
                완료
              </span>
            </div>
          }
        >
          오늘 해야 할 응원
        </SectionTitle>

        <CheeringGrid
          items={initialData.cheeringItems}
          completedIds={completedCheeringIds}
          onParticipate={handleOpenParticipateDialog}
        />
      </div>

      {/* 오늘의 총공 일정 */}
      <div className="mb-[40px]">
        <SectionTitle>오늘의 총공 일정</SectionTitle>
        {initialData.todaySchedule.length === 0 ? (
          <div className="flex flex-col gap-[2px] py-[64px] items-center justify-center">
            <Image
              src={'/icon/empty.svg'}
              alt="EmptyIcon"
              width={64}
              height={64}
            />
            <p className="text-body-13 text-secondary-500">
              오늘 총공 일정이 없어요.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-[8px]">
            {initialData.todaySchedule.map((schedule) => (
              <NavigationListItem
                key={`${schedule.menuType}-${schedule.detailId}`}
                icon={schedule.menuType === 'MUSIC' ? 'music' : 'vote'}
                title={schedule.title}
                time={formatScheduleTime(schedule.time)}
                platform={schedule.platformNames
                  .map(getPlatformLabel)
                  .join(', ')}
                href={`/urgent/${schedule.detailId}?menuType=${schedule.menuType}`}
              />
            ))}
          </div>
        )}
      </div>

      <div
        className="relative aspect-[335/152] w-full overflow-hidden rounded-[16px] bg-cover bg-center bg-no-repeat bg-secondary-950 border border-secondary-800"
        style={{
          backgroundImage: "url('/mainX-banner.png')",
        }}
      >
        <div className="relative z-10 flex py-[20px] h-full flex-col justify-center text-center items-center">
          <div>
            <p className="mb-[2px] text-body-11 text-secondary-400">
              VIP 활동 가이드
            </p>
            <h2 className="mb-[6px] text-[20px] font-bold text-secondary-1">
              X에서 화력 모으기
            </h2>
            <p className="mb-[14px] text-body-13 text-secondary-300">
              필수 계정과 오늘의 해시태그를 한눈에 확인해요
            </p>
          </div>

          <Link
            href="/x-guide"
            className="rounded-full bg-white px-[24px] py-[6px] text-body-11 font-bold text-secondary-950"
          >
            보러가기
          </Link>
        </div>
      </div>

      <AppDialog
        open={dialogStep !== null}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog();
          }
        }}
        title={currentDialogConfig?.title ?? ''}
        description={
          currentDialogConfig && dialogContext
            ? currentDialogConfig.description(dialogContext)
            : ''
        }
        actions={
          dialogStep === 'CONFIRM'
            ? [
                {
                  label: '취소',
                  variant: 'secondary',
                  onClick: handleCloseDialog,
                },
                {
                  label: currentDialogConfig?.buttonLabel ?? '참여완료',
                  disabled: participateCheeringMutation.isPending,
                  onClick: handleParticipate,
                },
              ]
            : [
                {
                  label: currentDialogConfig?.buttonLabel ?? '확인',
                  onClick: handleCloseDialog,
                },
              ]
        }
      />

      {participateCheeringMutation.isPending && (
        <LoadingScreen label="응원 참여 처리 중" />
      )}
    </main>
  );
}
