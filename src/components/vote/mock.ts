import type { DeadlineVoteListItemProps } from './DeadlineVoteListItem';
import type { OngoingVoteListItemProps } from './OngoingVoteListItem';

export const VOTE_DEADLINE_LIST_MOCK: DeadlineVoteListItemProps[] = [
  {
    id: '0',
    category: 'MUSIC_SHOW',
    title: '인기가요 [1317회] 핫스테이지...',
    remainingTime: '01:08:19',
    platform: '하이어(Higher)',
    href: '/vote',
  },
  {
    id: '1',
    category: 'ANNIVERSARY',
    title: '포도알 데뷔 카페 이벤트',
    remainingTime: '16:28:19',
    platform: '포도알',
    href: '/vote',
  },
];

export const VOTE_ONGOING_LIST_MOCK: OngoingVoteListItemProps[] = [
  {
    id: '0',
    category: 'AWARDS',
    remainingTime: '4일',
    title: '포브스코리아 여름 휴가 패션을 기대하게 만드는 아티스트',
    platform: '포도알',
    href: '/vote',
  },
  {
    id: '1',
    category: 'ETC',
    remainingTime: '6일',
    title: '벅스 8월 아티스트',
    platform: '벅스',
    href: '/vote',
  },
  {
    id: '2',
    category: 'ANNIVERSARY',
    remainingTime: '8일',
    title: '포도알 8월 데뷔 아티스트',
    platform: '포도알',
    href: '/vote',
  },
];
