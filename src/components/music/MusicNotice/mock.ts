import type { MusicNoticeListItemProps } from './MusicNoticeListItem';

export const MUSIC_NOTICE_MOCK_DATA: Array<
  Omit<MusicNoticeListItemProps, 'noticeId'> & { id: string }
> = [
  {
    id: '1',
    title: '[수정] 스트리밍 리스트 ver.2로 업데이트 됐어요.',
    date: '2026. 08. 19',
    pinned: true,
    showThumbnail: true,
    thumbnailSrc: '',
  },
  {
    id: '2',
    title: '[모집] 멜론 아이디가 부족해요.',
    date: '2026. 08. 19',
    pinned: true,
    showThumbnail: true,
    thumbnailSrc: '',
  },
  {
    id: '3',
    title: '[모금] 음원 총공 모금 40% 달성 안내',
    date: '2026. 08. 19',
    pinned: true,
    showThumbnail: true,
    thumbnailSrc: '',
  },
  {
    id: '4',
    title: '[변경] 오늘 다운로드 총공 시간이 변경됐어요. 오후 7시 → 오후 8시',
    date: '2026. 08. 19',
    pinned: false,
    showThumbnail: false,
    thumbnailSrc: '',
  },
];
