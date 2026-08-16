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

export type MusicDetailGuide = {
  guideId: number;
  guideType: string;
  title: string;
};

export type MusicDetailResponse = {
  id: number;
  category: 'DOWNLOAD' | 'STREAMING' | 'ETC';
  title: string;
  songName: string | null;
  platformNames: string[];
  platformUrl: string | null;
  eventAt: string | null;
  description: string | null;
  checklist: string[];
  imageUrls: string[];
  guides: MusicDetailGuide[];
};

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

export type MusicNoticeListItem = {
  id: number;
  title: string;
  createdAt: string;
};

export type MusicNoticeDetail = MusicNoticeListItem & {
  content: string;
  imageUrls: string[];
};
