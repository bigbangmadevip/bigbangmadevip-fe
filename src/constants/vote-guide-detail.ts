export type VoteGuideDetailId =
  | 'musiccore'
  | 'musicbank'
  | 'inkigayo'
  | 'showchampion'
  | 'mcountdown'
  | 'theshow'
  | 'melon-weekly';

export type VoteGuideDetailSection = {
  id: string;
  label: string;
  images?: string[];
};

export type VoteGuideDetail = {
  title: string;
  overviewImage?: string;
  sections: VoteGuideDetailSection[];
};

export const VOTE_GUIDE_DETAIL: Record<VoteGuideDetailId, VoteGuideDetail> = {
  musiccore: {
    title: '쇼! 음악중심 투표 가이드',
    overviewImage: '/images/voteguide/musiccore.jpg',
    sections: [
      {
        id: 'mubeat',
        label: '뮤빗 가이드',
        images: [
          '/images/voteguide/mubeat-1.jpg',
          '/images/voteguide/mubeat-2.jpg',
        ],
      },
      {
        id: 'muniverse',
        label: '뮤니버스 가이드',
        images: [
          '/images/voteguide/muniverse-1.jpg',
          '/images/voteguide/muniverse-2.jpg',
          '/images/voteguide/muniverse-3.png',
          '/images/voteguide/muniverse-4.png',
          '/images/voteguide/muniverse-5.jpg',
        ],
      },
    ],
  },
  musicbank: {
    title: '뮤직뱅크 투표 가이드',
    overviewImage: '/images/voteguide/musicbank.jpg',
    sections: [
      {
        id: 'coogoong',
        label: '쿠궁 가이드',
        images: [
          '/images/voteguide/coogoong-1.jpg',
          '/images/voteguide/coogoong-2.jpg',
          '/images/voteguide/coogoong-3.jpg',
        ],
      },
    ],
  },
  inkigayo: {
    title: '인기가요 투표 가이드',
    overviewImage: '/images/voteguide/inkigayo.jpg',
    sections: [
      {
        id: 'linc',
        label: '링크 가이드',
        images: [
          '/images/voteguide/linc-1.jpeg',
          '/images/voteguide/linc-2.jpg',
        ],
      },
      {
        id: 'higher',
        label: '하이어 가이드',
        images: [
          '/images/voteguide/higher-1.jpg',
          '/images/voteguide/higher-2.jpg',
          '/images/voteguide/higher-3.jpg',
          '/images/voteguide/higher-4.jpg',
          '/images/voteguide/higher-5.jpg',
        ],
      },
    ],
  },
  showchampion: {
    title: '쇼챔피언 투표 가이드',
    overviewImage: '/images/voteguide/showchampion.jpg',
    sections: [
      {
        id: 'idolchamp',
        label: '아이돌챔프 가이드',
        images: [
          '/images/voteguide/idolchamp-1.jpg',
          '/images/voteguide/idolchamp-2.jpg',
          '/images/voteguide/idolchamp-3.jpg',
          '/images/voteguide/idolchamp-4.jpg',
        ],
      },
    ],
  },
  mcountdown: {
    title: '엠카운트다운 투표 가이드',
    overviewImage: '/images/voteguide/mcountdown.jpg',
    sections: [
      {
        id: 'mnetplus',
        label: '엠넷플러스 가이드',
        images: ['/images/voteguide/mnetplus-1.jpg'],
      },
    ],
  },
  theshow: {
    title: '더쇼 투표 가이드',
    overviewImage: '/images/voteguide/theshow.jpg',
    sections: [
      {
        id: 'bigc',
        label: '빅크 가이드',
        images: [
          '/images/voteguide/bigc-1.jpg',
          '/images/voteguide/bigc-2.jpg',
          '/images/voteguide/bigc-3.jpg',
          '/images/voteguide/bigc-4.jpg',
          '/images/voteguide/bigc-5.jpg',
          '/images/voteguide/bigc-6.jpg',
          '/images/voteguide/bigc-7.jpg',
        ],
      },
    ],
  },
  'melon-weekly': {
    title: '멜론 주간인기상 투표 가이드',
    overviewImage: '/images/voteguide/melonweekly.jpg',
    sections: [],
  },
};

export function isVoteGuideDetailId(value: string): value is VoteGuideDetailId {
  return value in VOTE_GUIDE_DETAIL;
}
