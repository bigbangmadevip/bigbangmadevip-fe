'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AppDialog } from '@/components/common/AppDialog';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { LoginRequiredDialog } from '@/components/common/LoginRequiredDialog';
import NavigationListItem from '@/components/common/NavigationListItem';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionTitle } from '@/components/common/SectionTitle';
import { getPlatformLabel } from '@/constants/platform';
import { getVotePlatformLabel } from '@/constants/vote-platform';
import { useParticipateCheeringMutation } from '@/hooks/mutations/useParticipateCheeringMutation';
import { useCurrentUserQuery } from '@/hooks/queries/useAuthQuery';
import type { HomeResponse } from '@/types/home';
import CheeringGrid from './CheeringGrid';
import { CHEERING_DIALOG_CONFIG } from './constants';
import HomeUrgentCarousel from './HomeUrgentCarousel';

type DialogStep = 'CONFIRM' | 'COMPLETE';

interface HomeContainerProps {
  initialData: HomeResponse;
}

function formatScheduleTime(value: string) {
  const matched = value.match(/T(\d{2}):(\d{2})/);

  return matched ? `${matched[1]}:${matched[2]}` : '';
}

function getSchedulePlatformLabel(
  menuType: 'MUSIC' | 'VOTE',
  platformNames: string[],
) {
  const getLabel =
    menuType === 'MUSIC' ? getPlatformLabel : getVotePlatformLabel;

  return platformNames.map(getLabel).join(', ');
}

export default function HomeContainer({ initialData }: HomeContainerProps) {
  const [now, setNow] = useState<number | null>(null);
  const [dialogStep, setDialogStep] = useState<DialogStep | null>(null);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [typeCompletedCount, setTypeCompletedCount] = useState<number | null>(
    null,
  );

  const [selectedCheeringId, setSelectedCheeringId] = useState<string | null>(
    null,
  );

  const participateCheeringMutation = useParticipateCheeringMutation();
  const {
    data: currentUser,
    isPending: isAuthPending,
    refetch: refetchCurrentUser,
  } = useCurrentUserQuery();
  const urgentDetails = initialData.urgentDetails;

  useEffect(() => {
    if (!urgentDetails?.some((item) => item.menuType === 'VOTE')) return;

    const updateNow = () => setNow(Date.now());
    const initialTimer = window.setTimeout(updateNow, 0);
    const interval = window.setInterval(updateNow, 60_000);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(interval);
    };
  }, [urgentDetails]);

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
        typeCompletedCount: typeCompletedCount ?? 0,
      }
    : null;

  const handleOpenParticipateDialog = async (cheeringId: string) => {
    let user = currentUser;

    if (isAuthPending) {
      const result = await refetchCurrentUser();
      user = result.data;
    }

    if (!user) {
      setIsLoginDialogOpen(true);
      return;
    }

    setTypeCompletedCount(null);
    setSelectedCheeringId(cheeringId);
    setDialogStep('CONFIRM');
  };

  const handleCloseDialog = () => {
    setDialogStep(null);
    setSelectedCheeringId(null);
    setTypeCompletedCount(null);
  };

  const handleParticipate = () => {
    if (!selectedCheeringId || participateCheeringMutation.isPending) return;

    participateCheeringMutation.mutate(selectedCheeringId, {
      onSuccess: ({ typeCompletedCount: completedCount }) => {
        setTypeCompletedCount(completedCount);
        setDialogStep('COMPLETE');
      },
    });
  };

  return (
    <main>
      <PageHeader
        rightAction={
          <HeaderIconButton label="알림" align="end">
            <div className="h-[24px] w-[24px]"></div>
            {/* <Image
              src="/icon/line/alarm_white-24.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            /> */}
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
      {/* {urgentDetailMock && urgentDetailMock.length > 0 && (
        <HomeUrgentCarousel items={urgentDetailMock} now={now} />
      )} */}
      {urgentDetails && urgentDetails.length > 0 && (
        <HomeUrgentCarousel items={urgentDetails} now={now} />
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
                icon={`${schedule.menuType.toLowerCase()}-yellow`}
                title={schedule.title}
                time={formatScheduleTime(schedule.time)}
                platform={getSchedulePlatformLabel(
                  schedule.menuType,
                  schedule.platformNames,
                )}
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

      <LoginRequiredDialog
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
      />

      {participateCheeringMutation.isPending && (
        <LoadingScreen label="응원 참여 처리 중" />
      )}
    </main>
  );
}
