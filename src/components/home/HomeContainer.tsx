'use client';

import { useState } from 'react';
import { AppDialog } from '@/components/common/AppDialog';
import NavigationListItem, {
  NavigationListItemProps,
} from '@/components/common/NavigationListItem';
import { SectionTitle } from '@/components/common/SectionTitle';
import { api } from '@/lib/api';
import { HomeResponse } from '@/types/home';
import CheeringGrid from './CheeringGrid';

const VISITOR_CNT = '8,019';

type DIALOG_STEP = 'CONFIRM' | 'COMPLETE';

const todayScheduleMock: NavigationListItemProps[] = [
  {
    id: '0',
    icon: 'icon',
    title: '멜론 다운로드 총공',
    time: '19:00',
    platform: '멜론 (Melon)',
    href: '/',
  },
  {
    id: '1',
    icon: 'icon',
    title: '최애돌 생일 이벤트 화력 지원',
    time: '23:59',
    platform: '최애돌',
    href: '/',
  },
];

// const CHEERING_LIST: CheeringItem[] = [
//   {
//     id: 0,
//     icon: '/cheering_music.svg',
//     completedIcon: '/cheering_music_completed.svg',
//     alt: '음원 스트리밍',
//     title: '음원\n스트리밍',
//   },
//   {
//     id: 1,
//     icon: '/cheering_vote.svg',
//     alt: '인기가요 사전 투표',
//     title: '인기가요\n사전 투표',
//   },
//   {
//     id: 2,
//     icon: '/cheering_melon_vote.svg',
//     alt: '멜론 주간인기상 투표',
//     title: '멜론 주간인기상\n투표',
//   },
//   {
//     id: 3,
//     icon: '/cheering_youtube.svg',
//     alt: '유튜브 뮤직비디오 조회',
//     title: '유튜브\n뮤직비디오 조회',
//   },
//   {
//     id: '4',
//     icon: '/cheering_report.svg',
//     alt: '네이버 기사 댓글 작성',
//     title: '네이버 기사\n댓글 작성',
//   },
//   {
//     id: '5',
//     icon: '/cheering_event.svg',
//     alt: '선착순 이벤트 참여',
//     title: '선착순\n이벤트 참여',
//   },
// ];

interface HomeContainerProps {
  initialData: HomeResponse;
}

export default function HomeContainer({ initialData }: HomeContainerProps) {
  const [dialogStep, setDialogStep] = useState<DIALOG_STEP | null>(null);
  const [selectedCheeringId, setSelectedCheeringId] = useState<string | null>(
    null,
  );
  const [completedCheeringIds, setCompletedCheeringIds] = useState<string[]>(
    () =>
      initialData.cheeringItems
        .filter((item) => item.completed)
        .map((item) => item.id),
  );
  const [isParticipating, setIsParticipating] = useState(false);

  const handleOpenParticipateDialog = (cheeringId: string) => {
    setSelectedCheeringId(cheeringId);
    setDialogStep('CONFIRM');
  };

  const handleParticipate = async () => {
    if (selectedCheeringId === null || isParticipating) return;

    try {
      setIsParticipating(true);

      const response = await api.post(
        `/api/v1/cheerings/${selectedCheeringId}`,
      );

      console.log(
        `[POST /api/v1/cheerings/${selectedCheeringId}]`,
        response.data,
      );

      setCompletedCheeringIds((currentIds) =>
        currentIds.includes(selectedCheeringId)
          ? currentIds
          : [...currentIds, selectedCheeringId],
      );
      setDialogStep('COMPLETE');
    } catch (error) {
      console.error('[handleParticipate] 응원 참여 요청 실패', error);
    } finally {
      setIsParticipating(false);
    }
  };

  return (
    <main>
      {/* HEADER */}
      <div className="flex justify-end py-[12px]">
        <div>알림</div>
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
      <div className="rounded-[16px] border border-[#ECE818] p-[16px] mb-[40px]">
        <p className="text-body-12 mb-[20px] font-medium">
          🚨 놓치면 안되는 VIP 긴급 총공
        </p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-title-17 font-bold">
              인기가요 생방송 투표 진행중!
            </p>
            <p className="text-body-13 text-[#BBBBBB]">
              마감까지 32분 남음 | 하이어(Higher)
            </p>
          </div>
          <div>{'>'}</div>
        </div>
      </div>

      {/* 오늘 해야 할 응원 */}
      <div className="mb-[32px]">
        <SectionTitle action={<span>4 / 8 완료</span>}>
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
        {/* 총공 컴포넌트 블록 */}
        <div className="flex flex-col gap-[8px]">
          {todayScheduleMock.map((mock) => (
            <NavigationListItem
              key={mock.id}
              icon={mock.icon}
              title={mock.title}
              time={mock.time}
              platform={mock.platform}
              href={mock.href}
            />
          ))}
        </div>
      </div>
      <AppDialog
        open={dialogStep !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDialogStep(null);
            setSelectedCheeringId(null);
          }
        }}
        title={
          dialogStep === 'CONFIRM'
            ? '오늘 스트리밍을 완료했나요?'
            : '오늘의 스트리밍 완료!'
        }
        description={
          dialogStep === 'CONFIRM'
            ? '봄여름가을겨울을 듣고 왔다면\n참여완료를 눌러주세요.'
            : '현재 304명의 VIP가 함께 했어요.'
        }
        actions={
          dialogStep === 'CONFIRM'
            ? [
                {
                  label: '취소',
                  variant: 'secondary',
                  onClick: () => setDialogStep(null),
                },
                {
                  label: isParticipating ? '처리 중...' : '참여완료',
                  disabled: isParticipating,
                  onClick: handleParticipate,
                },
              ]
            : [
                {
                  label: '확인',
                  onClick: () => setDialogStep(null),
                },
              ]
        }
      />
    </main>
  );
}
