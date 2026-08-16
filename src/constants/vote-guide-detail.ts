import type { StaticImageData } from 'next/image';
import bigcImage1 from '@/assets/voteguide/bigc-1.png';
import bigcImage2 from '@/assets/voteguide/bigc-2.png';
import bigcImage3 from '@/assets/voteguide/bigc-3.png';
import bigcImage4 from '@/assets/voteguide/bigc-4.png';
import bigcImage5 from '@/assets/voteguide/bigc-5.png';
import bigcImage6 from '@/assets/voteguide/bigc-6.png';
import bigcImage7 from '@/assets/voteguide/bigc-7.png';
import coogoongImage1 from '@/assets/voteguide/coogoong-1.png';
import coogoongImage2 from '@/assets/voteguide/coogoong-2.png';
import coogoongImage3 from '@/assets/voteguide/coogoong-3.png';
import higherImage1 from '@/assets/voteguide/higher-1.png';
import higherImage2 from '@/assets/voteguide/higher-2.png';
import higherImage3 from '@/assets/voteguide/higher-3.png';
import higherImage4 from '@/assets/voteguide/higher-4.png';
import higherImage5 from '@/assets/voteguide/higher-5.png';
import idolchampImage1 from '@/assets/voteguide/idolchamp-1.png';
import idolchampImage2 from '@/assets/voteguide/idolchamp-2.png';
import idolchampImage3 from '@/assets/voteguide/idolchamp-3.png';
import idolchampImage4 from '@/assets/voteguide/idolchamp-4.png';
import inkigayoImage from '@/assets/voteguide/inga.png';
import lincImage1 from '@/assets/voteguide/linc-1.png';
import lincImage2 from '@/assets/voteguide/linc-2.png';
import mcountdownImage from '@/assets/voteguide/mcountdown.png';
import melonWeeklyImage from '@/assets/voteguide/melonweekly.png';
import mnetplusImage1 from '@/assets/voteguide/mnetplus-1.png';
import mubeatImage1 from '@/assets/voteguide/mubeat-1.png';
import mubeatImage2 from '@/assets/voteguide/mubeat-2.png';
import musicbankImage from '@/assets/voteguide/musicbank.png';
import musiccoreImage from '@/assets/voteguide/musiccore.png';
import muniverseImage1 from '@/assets/voteguide/muniverse-1.png';
import muniverseImage2 from '@/assets/voteguide/muniverse-2.png';
import muniverseImage3 from '@/assets/voteguide/muniverse-3.png';
import muniverseImage4 from '@/assets/voteguide/muniverse-4.png';
import muniverseImage5 from '@/assets/voteguide/muniverse-5.png';
import showchampionImage from '@/assets/voteguide/showchampion.png';
import theshowImage from '@/assets/voteguide/theshow.png';

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
    overviewImage: musicbankImage,
    sections: [
      {
        id: 'coogoong',
        label: '쿠궁 가이드',
        images: [coogoongImage1, coogoongImage2, coogoongImage3],
      },
    ],
  },
  inkigayo: {
    title: '인기가요 투표 가이드',
    overviewImage: inkigayoImage,
    sections: [
      {
        id: 'linc',
        label: '링크 가이드',
        images: [lincImage1, lincImage2],
      },
      {
        id: 'higher',
        label: '하이어 가이드',
        images: [
          higherImage1,
          higherImage2,
          higherImage3,
          higherImage4,
          higherImage5,
        ],
      },
    ],
  },
  showchampion: {
    title: '쇼챔피언 투표 가이드',
    overviewImage: showchampionImage,
    sections: [
      {
        id: 'idolchamp',
        label: '아이돌챔프 가이드',
        images: [
          idolchampImage1,
          idolchampImage2,
          idolchampImage3,
          idolchampImage4,
        ],
      },
    ],
  },
  mcountdown: {
    title: '엠카운트다운 투표 가이드',
    overviewImage: mcountdownImage,
    sections: [
      {
        id: 'mnetplus',
        label: '엠넷플러스 가이드',
        images: [mnetplusImage1],
      },
    ],
  },
  theshow: {
    title: '더쇼 투표 가이드',
    overviewImage: theshowImage,
    sections: [
      {
        id: 'bigc',
        label: '빅크 가이드',
        images: [
          bigcImage1,
          bigcImage2,
          bigcImage3,
          bigcImage4,
          bigcImage5,
          bigcImage6,
          bigcImage7,
        ],
      },
    ],
  },
  'melon-weekly': {
    title: '멜론 주간인기상 투표 가이드',
    overviewImage: melonWeeklyImage,
    sections: [],
  },
};

export function isVoteGuideDetailId(
  value: string,
): value is VoteGuideDetailId {
  return value in VOTE_GUIDE_DETAIL;
}
