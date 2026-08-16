export const CATEGORY_BADGE_CONFIG = {
  DOWNLOAD: {
    label: '다운로드',
    color: '#FF54BE',
  },
  STREAMING: {
    label: '스트리밍',
    color: '#5CDB9E',
  },
  ETC: {
    label: '기타',
    color: '#5DCCF8',
  },
  MUSIC_SHOW: {
    label: '음악방송',
    color: '#DEFF4B',
  },
  AWARDS: {
    label: '시상식',
    color: '#FAB12A',
  },
  ANNIVERSARY: {
    label: '기념일',
    color: '#7762FC',
  },
} as const;

export type CategoryBadgeType = keyof typeof CATEGORY_BADGE_CONFIG;
