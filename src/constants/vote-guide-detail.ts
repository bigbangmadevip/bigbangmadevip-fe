import type { StaticImageData } from 'next/image';
import mubeatImage1 from '@/assets/voteguide/mubeat-1.png';
import mubeatImage2 from '@/assets/voteguide/mubeat-2.png';
import musiccoreImage from '@/assets/voteguide/musiccore.png';
import muniverseImage1 from '@/assets/voteguide/muniverse-1.png';
import muniverseImage2 from '@/assets/voteguide/muniverse-2.png';
import muniverseImage3 from '@/assets/voteguide/muniverse-3.png';
import muniverseImage4 from '@/assets/voteguide/muniverse-4.png';
import muniverseImage5 from '@/assets/voteguide/muniverse-5.png';

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
  images?: StaticImageData[];
};

export type VoteGuideDetail = {
  title: string;
  overviewImage?: StaticImageData;
  sections: VoteGuideDetailSection[];
};

export const VOTE_GUIDE_DETAIL: Record<
  VoteGuideDetailId,
  VoteGuideDetail
> = {
  musiccore: {
    title: '쇼! 음악중심 투표 가이드',
    overviewImage: musiccoreImage,
    sections: [
      {
        id: 'mubeat',
        label: '뮤빗 가이드',
        images: [mubeatImage1, mubeatImage2],
      },
      {
        id: 'muniverse',
        label: '뮤니버스 가이드',
        images: [
          muniverseImage1,
          muniverseImage2,
          muniverseImage3,
          muniverseImage4,
          muniverseImage5,
        ],
      },
    ],
  },
  musicbank: {
    title: '뮤직뱅크 투표 가이드',
    sections: [{ id: 'kogoong', label: '쿠궁 가이드' }],
  },
  inkigayo: {
    title: '인기가요 투표 가이드',
    sections: [
      { id: 'linc', label: '링크 가이드' },
      { id: 'higher', label: '하이어 가이드' },
    ],
  },
  showchampion: {
    title: '쇼챔피언 투표 가이드',
    sections: [{ id: 'idolchamp', label: '아이돌챔프 가이드' }],
  },
  mcountdown: {
    title: '엠카운트다운 투표 가이드',
    sections: [{ id: 'mnetplus', label: '엠넷플러스 가이드' }],
  },
  theshow: {
    title: '더쇼 투표 가이드',
    sections: [{ id: 'bigc', label: '빅크 가이드' }],
  },
  'melon-weekly': {
    title: '멜론 주간인기상 투표 가이드',
    sections: [],
  },
};

export function isVoteGuideDetailId(
  value: string,
): value is VoteGuideDetailId {
  return value in VOTE_GUIDE_DETAIL;
}
