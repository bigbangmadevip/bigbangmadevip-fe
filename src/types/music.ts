export type Platform =
  | 'melon'
  | 'genie'
  | 'bugs'
  | 'flo'
  | 'vibe'
  | 'samsungmusic'
  | 'spotify'
  | 'applemusic'
  | 'youtubemusic'
  | 'linemusic'
  | 'stationhead'
  | 'kakaomusic'
  | 'youtube';

export const PLATFORM_LABEL = {
  melon: '멜론',
  genie: '지니',
  bugs: '벅스',
  flo: '플로',
  vibe: '바이브',
  samsungmusic: '삼성뮤직',
  spotify: '스포티파이',
  applemusic: '애플뮤직',
  youtubemusic: '유튜브 뮤직',
  linemusic: '라인뮤직',
  stationhead: '스테이션헤드',
  kakaomusic: '카카오뮤직',
  youtube: '유튜브 뮤비',
} satisfies Record<Platform, string>;

// TODO: API 응답 확인 후 구체적인 DTO로 교체
export type MusicDetailResponse = Record<string, unknown>;

export type MusicRegion = 'DOMESTIC' | 'GLOBAL';

export type MusicOs = 'ANDROID' | 'IPHONE' | 'IPAD' | 'MAC' | 'WINDOWS';

export type MusicStreamingUrgent = {
  detailId: number;
  urgentContent: string;
};

export type MusicStreamingLink = {
  label: string;
  url: string;
};

export type MusicStreamingOsGroup = {
  os: MusicOs;
  links: MusicStreamingLink[];
};

export type MusicStreamingPlatform = {
  platformId: number;
  name: string;
  iconUrl: string | null;
  region: MusicRegion;
  osGroups: MusicStreamingOsGroup[];
};

export type MusicStreamingResponse = {
  urgent: MusicStreamingUrgent | null;
  platforms: MusicStreamingPlatform[];
  streamingImageUrls: string[];
  imagesUpdatedAt: string | null;
};
