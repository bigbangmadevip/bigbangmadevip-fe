'use client';

import Image from 'next/image';
import { useState } from 'react';
import { AppDialog } from '@/components/common/AppDialog';
import NavigationListItem, {
  NavigationListItemProps,
} from '@/components/common/NavigationListItem';
import { SectionTitle } from '@/components/common/SectionTitle';
import { useParticipateCheeringMutation } from '@/hooks/mutations/useParticipateCheeringMutation';
import type { HomeResponse } from '@/types/home';
import CheeringGrid from './CheeringGrid';
import { CHEERING_DIALOG_CONFIG } from './constants';

type DialogStep = 'CONFIRM' | 'COMPLETE';

interface HomeContainerProps {
  initialData: HomeResponse;
}

const todayScheduleMock: NavigationListItemProps[] = [
  {
    id: '0',
    icon: 'music',
    title: '멜론 다운로드 총공',
    time: '19:00',
    platform: '멜론 (Melon)',
    href: '/',
  },
  {
    id: '1',
    icon: 'vote',
    title: '최애돌 생일 이벤트 화력 지원',
    time: '23:59',
    platform: '최애돌',
    href: '/',
  },
];

export default function HomeContainer({ initialData }: HomeContainerProps) {
  const [dialogStep, setDialogStep] = useState<DialogStep | null>(null);

  const [selectedCheeringId, setSelectedCheeringId] = useState<string | null>(
    null,
  );

  const participateCheeringMutation = useParticipateCheeringMutation();

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
      {/* HEADER */}
      <div className="flex justify-end py-[12px]">
        <Image src="/icon/alarm.svg" alt="알림" width={24} height={24} />
      </div>

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
      <div className="mb-[40px] rounded-[16px] border border-main p-[16px] bg-[rgba(255,251,31,0.04)]">
        <p className="mb-[20px] text-body-12 font-medium">
          🚨 놓치면 안되는 VIP 긴급 총공
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-title-17 font-bold mb-[2px]">
              인기가요 생방송 투표 진행중!
            </p>

            <div className="flex gap-[2px] items-center">
              <Image
                src={'/icon/time-red.svg'}
                alt="time-red"
                width={16}
                height={16}
              />
              <span className="text-body-13 text-[rgb(255,89,64)]">
                마감까지 32분 남음
              </span>
              <span className="text-body-13 px-[6px] font-bold text-secondary-300">
                |
              </span>
              <span className="text-body-13 font-medium text-secondary-300">
                하이어(Higher)
              </span>
            </div>
          </div>

          <Image
            src={'/icon/arrow-right_yellow-bg.svg'}
            alt="arrowRightIcon"
            width={32}
            height={32}
          />
        </div>
      </div>

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
        {todayScheduleMock.length === 0 ? (
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
            {todayScheduleMock.map((schedule) => (
              <NavigationListItem
                key={schedule.id}
                icon={schedule.icon}
                title={schedule.title}
                time={schedule.time}
                platform={schedule.platform}
                href={schedule.href}
              />
            ))}
          </div>
        )}
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
                  label: participateCheeringMutation.isPending
                    ? '처리 중...'
                    : (currentDialogConfig?.buttonLabel ?? '참여완료'),
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
    </main>
  );
}
