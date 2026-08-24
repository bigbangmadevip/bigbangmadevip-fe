export const VOTE_PLATFORM_ICON = {
  bigc: '/images/voteplatform/bigc.png',
  bugs: '/images/voteplatform/bugs.png',
  choiaedol: '/images/voteplatform/choiaedol.png',
  higher: '/images/voteplatform/higher.png',
  idolchamp: '/images/voteplatform/idolchamp.png',
  coogoong: '/images/voteplatform/coogoong.png',
  linc: '/images/voteplatform/linc.png',
  melon: '/images/voteplatform/melon.png',
  mnetplus: '/images/voteplatform/mnetplus.png',
  mubeat: '/images/voteplatform/mubeat.png',
  muniverse: '/images/voteplatform/muniverse.png',
  podoal: '/images/voteplatform/podoal.png',
} as const;

export type VotePlatformCode = keyof typeof VOTE_PLATFORM_ICON;

export const VOTE_PLATFORM_LABEL: Record<VotePlatformCode, string> = {
  bigc: '빅크',
  bugs: '벅스 (Bugs)',
  choiaedol: '최애돌',
  higher: '하이어 (Higher)',
  idolchamp: '아이돌챔프',
  coogoong: '쿠궁',
  linc: '링크',
  melon: '멜론',
  mnetplus: '엠넷플러스 (Mnet plus)',
  mubeat: '뮤빗',
  muniverse: '뮤니버스',
  podoal: '포도알',
};

const VOTE_PLATFORM_CODE_ALIAS: Record<string, VotePlatformCode> = {
  bigc: 'bigc',
  빅크: 'bigc',
  bugs: 'bugs',
  벅스: 'bugs',
  choiaedol: 'choiaedol',
  choeaedol: 'choiaedol',
  최애돌: 'choiaedol',
  higher: 'higher',
  하이어: 'higher',
  idolchamp: 'idolchamp',
  아이돌챔프: 'idolchamp',
  coogoong: 'coogoong',
  쿠궁: 'coogoong',
  linc: 'linc',
  링크: 'linc',
  melon: 'melon',
  멜론: 'melon',
  melonweekly: 'melon',
  멜론주간인기상: 'melon',
  mnetplus: 'mnetplus',
  'mnet+': 'mnetplus',
  엠넷플러스: 'mnetplus',
  mubeat: 'mubeat',
  뮤빗: 'mubeat',
  muniverse: 'muniverse',
  뮤니버스: 'muniverse',
  podoal: 'podoal',
  포도알: 'podoal',
};

function normalizeVotePlatform(platform: string) {
  return platform
    .replace(/\([^)]*\)/g, '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, '');
}

export function getVotePlatformIcon(platform: string) {
  const platformCode =
    VOTE_PLATFORM_CODE_ALIAS[normalizeVotePlatform(platform)];

  return platformCode ? VOTE_PLATFORM_ICON[platformCode] : null;
}

export function getVotePlatformLabel(platform: string) {
  const platformCode =
    VOTE_PLATFORM_CODE_ALIAS[normalizeVotePlatform(platform)];

  return platformCode ? VOTE_PLATFORM_LABEL[platformCode] : platform;
}
