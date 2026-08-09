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
  | 'musicvideo';

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
  musicvideo: '뮤직비디오',
} satisfies Record<Platform, string>;

// TODO: API 응답 확인 후 구체적인 DTO로 교체
export type MusicStreamingResponse = Record<string, unknown>;
export type MusicDetailResponse = Record<string, unknown>;
