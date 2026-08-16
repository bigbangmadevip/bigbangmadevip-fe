import type { StaticImageData } from 'next/image';
import { VOTE_GUIDE_THUMBNAIL } from '@/constants/vote-guide';
import { getVotePlatformIcon } from '@/constants/vote-platform';
import type { VoteGuideCategory } from '@/types/vote';

interface VoteGuideContentPlatform {
  iconSrc: string;
  anchorId?: string;
  title: string;
  caption?: string;
}

export interface VoteGuideContent {
  title?: string;
  href?: string;
  thumbnailSrc: string | StaticImageData;
  caption?: string;
  description?: string;
  platform?: VoteGuideContentPlatform[];
}

export interface VoteGuideItem {
  id: string;
  category: Exclude<VoteGuideCategory, 'all'>;
  title: string;
  content: VoteGuideContent[];
}

export const VOTE_GUIDE_MOCK_DATA: VoteGuideItem[] = [
  {
    id: 'music-show',
    category: 'music-show',
    title: '음악방송 투표 가이드',
    content: [
      {
        title: '쇼! 음악중심',
        href: '/vote/guide/musiccore',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.musiccore,
        caption: '뮤빗, 뮤니버스',
        platform: [
          {
            iconSrc: getVotePlatformIcon('mubeat') ?? '',
            anchorId: 'mubeat',
            title: '뮤빗',
          },
          {
            iconSrc: getVotePlatformIcon('muniverse') ?? '',
            anchorId: 'muniverse',
            title: '뮤니버스',
          },
        ],
      },
      {
        title: '뮤직뱅크',
        href: '/vote/guide/musicbank',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.musicbank,
        caption: '쿠궁',
        platform: [
          {
            iconSrc: getVotePlatformIcon('coogoong') ?? '',
            anchorId: 'coogoong',
            title: '쿠궁',
          },
        ],
      },
      {
        title: '인기가요',
        href: '/vote/guide/inkigayo',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.inkigayo,
        caption: '링크, 하이어',
        platform: [
          {
            iconSrc: getVotePlatformIcon('linc') ?? '',
            anchorId: 'linc',
            title: '링크',
          },
          {
            iconSrc: getVotePlatformIcon('higher') ?? '',
            anchorId: 'higher',
            title: '하이어',
          },
        ],
      },
      {
        title: '쇼챔피언',
        href: '/vote/guide/showchampion',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.showchampion,
        caption: '아이돌챔프',
        platform: [
          {
            iconSrc: getVotePlatformIcon('idolchamp') ?? '',
            anchorId: 'idolchamp',
            title: '아이돌챔프',
          },
        ],
      },
      {
        title: '엠카운트다운',
        href: '/vote/guide/mcountdown',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.mcountdown,
        caption: '엠넷플러스',
        platform: [
          {
            iconSrc: getVotePlatformIcon('mnetplus') ?? '',
            anchorId: 'mnetplus',
            title: '엠넷플러스',
          },
        ],
      },
      {
        title: '더쇼',
        href: '/vote/guide/theshow',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.theshow,
        caption: '빅크',
        platform: [
          {
            iconSrc: getVotePlatformIcon('bigc') ?? '',
            anchorId: 'bigc',
            title: '빅크',
          },
        ],
      },
      {
        title: '멜론 주간인기상',
        href: '/vote/guide/melon-weekly',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.melonWeekly,
        caption: '멜론',
      },
    ],
  },
  {
    id: 'awards',
    category: 'awards',
    title: '시상식 투표 가이드',
    content: [
      {
        title: 'MAMA',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.mama,
        description: '투표 비율 반영과 참여 방법 안내',
      },
      {
        title: 'MMA',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.mma,
        description: '투표 비율 반영과 참여 방법 안내',
      },
    ],
  },
  {
    id: 'etc',
    category: 'etc',
    title: '기타 투표 가이드',
    content: [
      {
        title: '포도알',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.podoal,
        description: '투표 비율 반영과 참여 방법 안내',
      },
      {
        title: '벅스',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.bugs,
        description: '투표 비율 반영과 참여 방법 안내',
      },
      {
        title: 'B.stage+',
        thumbnailSrc: VOTE_GUIDE_THUMBNAIL.bstage,
        description: '투표 비율 반영과 참여 방법 안내',
      },
    ],
  },
];
