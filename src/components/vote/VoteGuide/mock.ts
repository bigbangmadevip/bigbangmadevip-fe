import type { VoteGuideCategory } from '@/types/vote';

interface VoteGuideContentPlatform {
  iconSrc: string;
  title: string;
  caption?: string;
}

export interface VoteGuideContent {
  title?: string;
  thumbnailSrc: string;
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
        thumbnailSrc: '',
        caption: '뮤빗, 뮤니버스',
        platform: [
          {
            iconSrc: '',
            title: '뮤빗',
          },
          {
            iconSrc: '',
            title: '뮤니버스',
          },
        ],
      },
      {
        title: '뮤직뱅크',
        thumbnailSrc: '',
        caption: '쿠궁',
        platform: [
          {
            iconSrc: '',
            title: '쿠궁',
          },
        ],
      },
      {
        title: '인기가요',
        thumbnailSrc: '',
        caption: '링크, 하이어',
        platform: [
          {
            iconSrc: '',
            title: '링크',
          },
          {
            iconSrc: '',
            title: '하이어',
          },
        ],
      },
      {
        title: '쇼챔피언',
        thumbnailSrc: '',
        caption: '아이돌챔프',
        platform: [
          {
            iconSrc: '',
            title: '아이돌챔프',
          },
        ],
      },
      {
        title: '엠카운트다운',
        thumbnailSrc: '',
        caption: '엠넷플러스',
        platform: [
          {
            iconSrc: '',
            title: '엠넷플러스',
          },
        ],
      },
      {
        title: '더쇼',
        thumbnailSrc: '',
        caption: '빅크',
      },
      {
        title: '멜론 주간인기상',
        thumbnailSrc: '',
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
        thumbnailSrc: '',
        description: '투표 비율 반영과 참여 방법 안내',
      },
      {
        title: 'MMA',
        thumbnailSrc: '',
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
        thumbnailSrc: '',
        description: '더미더미더미더미더미더미',
      },
      {
        title: '벅스',
        thumbnailSrc: '',
        description: '더미더미더미더미더미더미',
      },
      {
        title: 'B.stage+',
        thumbnailSrc: '',
        description: '더미더미더미더미더미더미',
      },
    ],
  },
];
