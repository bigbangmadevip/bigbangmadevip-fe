import type { CategoryBadgeType } from '@/constants/category-badge';
import type { Platform } from '@/types/music';
import { PLATFORM_LABEL } from '@/types/music';

type MusicGuideCategory = Extract<CategoryBadgeType, 'DOWNLOAD' | 'STREAMING'>;

export type MusicGuideLink = {
  id: string;
  platform: Platform;
  title: string;
  description: string;
  href: string;
  iconSrc: string;
};

const GUIDE_CATEGORY_PATH = {
  DOWNLOAD: 'download',
  STREAMING: 'streaming',
} satisfies Record<MusicGuideCategory, string>;

const GUIDE_CATEGORY_LABEL = {
  DOWNLOAD: '다운로드 가이드',
  STREAMING: '스트리밍 가이드',
} satisfies Record<MusicGuideCategory, string>;

const PLATFORM_ALIASES: Partial<Record<Platform, string[]>> = {
  melon: ['melon', '멜론', '멜론(melon)'],
  genie: ['genie', '지니', '지니(genie)'],
  bugs: ['bugs', '벅스', '벅스(bugs)'],
  flo: ['flo', '플로', '플로(flo)'],
  vibe: ['vibe', '바이브', '바이브(vibe)'],
  samsungmusic: [
    'samsungmusic',
    'samsung music',
    '삼성뮤직',
    '삼성뮤직(samsung music)',
  ],
  spotify: ['spotify', '스포티파이', '스포티파이(spotify)'],
  applemusic: [
    'applemusic',
    'apple music',
    '애플뮤직',
    '애플뮤직(apple music)',
  ],
  youtubemusic: [
    'youtubemusic',
    'youtube music',
    '유튜브 뮤직',
    '유튜브 뮤직(youtube music)',
  ],
  linemusic: ['linemusic', 'line music', '라인뮤직', '라인뮤직(line music)'],
  stationhead: ['stationhead', '스테이션헤드'],
  kakaomusic: [
    'kakaomusic',
    'kakao music',
    '카카오뮤직',
    '카카오뮤직(kakao music)',
  ],
  youtube: ['youtube', '유튜브'],
};

function normalizePlatformName(platformName: string) {
  return platformName.trim().toLowerCase().replace(/\s+/g, ' ');
}

function getPlatformCode(platformName: string): Platform | null {
  const normalizedName = normalizePlatformName(platformName);
  const matchedPlatform = Object.entries(PLATFORM_ALIASES).find(([, aliases]) =>
    aliases?.some((alias) => normalizePlatformName(alias) === normalizedName),
  );

  return (matchedPlatform?.[0] as Platform | undefined) ?? null;
}

function isMusicGuideCategory(
  category: CategoryBadgeType,
): category is MusicGuideCategory {
  return category === 'DOWNLOAD' || category === 'STREAMING';
}

export function getMusicGuideLinks(
  category: CategoryBadgeType,
  platformNames: string[],
): MusicGuideLink[] {
  if (!isMusicGuideCategory(category)) return [];

  const guideCategory = GUIDE_CATEGORY_PATH[category];

  return platformNames.reduce<MusicGuideLink[]>((guides, platformName) => {
    const platform = getPlatformCode(platformName);

    if (!platform || guides.some((guide) => guide.platform === platform)) {
      return guides;
    }

    guides.push({
      id: `${guideCategory}-${platform}`,
      platform,
      title: PLATFORM_LABEL[platform],
      description: GUIDE_CATEGORY_LABEL[category],
      href: `/music/guide/${guideCategory}/${platform}`,
      iconSrc: `/images/musicguide/filledlogo/${platform}.png`,
    });

    return guides;
  }, []);
}
