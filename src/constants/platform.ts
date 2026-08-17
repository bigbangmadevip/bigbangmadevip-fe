export const PLATFORM_LABEL = {
  melon: '멜론 (Melon)',
  genie: '지니 (Genie)',
  bugs: '벅스 (Bugs)',
  flo: '플로 (FLO)',
  vibe: '바이브 (VIBE)',
  samsungmusic: '삼성뮤직 (Samsung Music)',
  spotify: '스포티파이 (Spotify)',
  applemusic: '애플뮤직 (Apple Music)',
  youtubemusic: '유튜브 뮤직 (YouTube Music)',
  musicvideo: '유튜브 뮤직비디오 (YouTube Music Video)',
} as const;

export const PLATFORM_KOREAN_LABEL = {
  melon: '멜론',
  genie: '지니',
  bugs: '벅스',
  flo: '플로',
  vibe: '바이브',
  samsungmusic: '삼성뮤직',
  spotify: '스포티파이',
  applemusic: '애플뮤직',
  youtubemusic: '유튜브 뮤직',
} as const;

export type PlatformCode = keyof typeof PLATFORM_LABEL;

export function getPlatformLabel(platform: string) {
  const normalizedPlatform = platform.trim().toLowerCase() as PlatformCode;

  return PLATFORM_LABEL[normalizedPlatform] ?? platform;
}

export function getPlatformKoreanLabel(platform: string) {
  const normalizedPlatform = platform
    .trim()
    .toLowerCase() as keyof typeof PLATFORM_KOREAN_LABEL;

  return PLATFORM_KOREAN_LABEL[normalizedPlatform] ?? platform;
}
