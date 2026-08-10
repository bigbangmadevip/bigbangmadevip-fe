import { VoteNoticeListItemProps } from './VoteNoticeListItem';

export const VOTE_NOTICE_MOCK_DATA: Array<
  Omit<VoteNoticeListItemProps, 'noticeId'> & { id: string }
> = [
  {
    id: '1',
    title: '[수정] 인기가요 사전투표 가이드가 업데이트 됐어요.',
    date: '2026. 08. 19',
    pinned: true,
    showThumbnail: true,
    thumbnailSrc: '',
  },
  {
    id: '2',
    title: '[중요] 하이어 투표권 모으기 안내',
    date: '2026. 08. 19',
    pinned: true,
    showThumbnail: true,
    thumbnailSrc: '',
  },
  {
    id: '3',
    title: '[모금] 오늘 투표 총공 시간이 변경됐어요',
    date: '2026. 08. 19',
    pinned: true,
    showThumbnail: true,
    thumbnailSrc: '',
  },
  {
    id: '4',
    title: '[업데이트] 이번 주 음악방송 투표 일정 안내',
    date: '2026. 08. 19',
    pinned: false,
    showThumbnail: false,
    thumbnailSrc: '',
  },
  {
    id: '5',
    title: '[모집] 원활한 투표 총공 진행을 위해 투표 계정 지원이 필요합니다.',
    date: '2026. 08. 19',
    pinned: false,
    showThumbnail: false,
    thumbnailSrc: '',
  },
];
