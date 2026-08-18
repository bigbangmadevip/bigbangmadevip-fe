import {
  getVotePlatformIcon,
  getVotePlatformLabel,
} from '@/constants/vote-platform';
import type { VoteDetailResponse } from '@/types/vote';

export type VoteUrgentGuideLink = {
  id: string;
  title: string;
  description: string;
  href: string;
  iconSrc: string;
};

const MUSIC_SHOW_GUIDE_BY_PLATFORM: Record<
  string,
  { detailId: string; anchorId?: string }
> = {
  mubeat: { detailId: 'musiccore', anchorId: 'mubeat' },
  muniverse: { detailId: 'musiccore', anchorId: 'muniverse' },
  coogoong: { detailId: 'musicbank', anchorId: 'coogoong' },
  linc: { detailId: 'inkigayo', anchorId: 'linc' },
  higher: { detailId: 'inkigayo', anchorId: 'higher' },
  idolchamp: { detailId: 'showchampion', anchorId: 'idolchamp' },
  mnetplus: { detailId: 'mcountdown', anchorId: 'mnetplus' },
  bigc: { detailId: 'theshow', anchorId: 'bigc' },
  melon: { detailId: 'melon-weekly' },
};

const PLATFORM_ALIAS: Record<string, string> = {
  mubeat: 'mubeat',
  뮤빗: 'mubeat',
  muniverse: 'muniverse',
  뮤니버스: 'muniverse',
  coogoong: 'coogoong',
  쿠궁: 'coogoong',
  linc: 'linc',
  링크: 'linc',
  higher: 'higher',
  하이어: 'higher',
  idolchamp: 'idolchamp',
  아이돌챔프: 'idolchamp',
  mnetplus: 'mnetplus',
  엠넷플러스: 'mnetplus',
  bigc: 'bigc',
  빅크: 'bigc',
  melon: 'melon',
  멜론: 'melon',
};

function normalizePlatform(platform: string) {
  return platform
    .replace(/\([^)]*\)/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, '');
}

function getMusicShowGuideLinks(
  platformNames: string[],
): VoteUrgentGuideLink[] {
  return platformNames.reduce<VoteUrgentGuideLink[]>((links, platformName) => {
    const platformCode = PLATFORM_ALIAS[normalizePlatform(platformName)];
    const guide = platformCode
      ? MUSIC_SHOW_GUIDE_BY_PLATFORM[platformCode]
      : null;

    if (!guide) return links;

    const href = `/vote/guide/${guide.detailId}${
      guide.anchorId ? `#vote-guide-${guide.anchorId}` : ''
    }`;

    if (links.some((link) => link.href === href)) return links;

    const iconSrc = getVotePlatformIcon(platformName);

    if (!iconSrc) return links;

    links.push({
      id: `${guide.detailId}-${guide.anchorId ?? 'all'}`,
      title: getVotePlatformLabel(platformName),
      description: '투표 가이드',
      href,
      iconSrc,
    });

    return links;
  }, []);
}

export function getVoteUrgentGuideLinks(
  detail: VoteDetailResponse,
): VoteUrgentGuideLink[] {
  if (detail.category !== 'MUSIC_SHOW') return [];

  return getMusicShowGuideLinks(detail.platformNames);
}
