import type { CHEERING_CATEGORY } from '@/types/home';

type CHEERING_BADGE_OPTION = { on: string; off: string };

const CHEERING_BADGE_BY_CATEGORY: Record<
  CHEERING_CATEGORY,
  CHEERING_BADGE_OPTION | null
> = {
  STREAMING: {
    off: '/images/cheeringbadge/streaming_off.png',
    on: '/images/cheeringbadge/streaming_on.png',
  },
  DOWNLOAD: null,
  PREVOTE: {
    off: '/images/cheeringbadge/prevote_off.png',
    on: '/images/cheeringbadge/prevote_on.png',
  },
  YOUTUBEMV: {
    off: '/images/cheeringbadge/youtubemv_off.png',
    on: '/images/cheeringbadge/youtubemv_on.png',
  },
  VOTECOIN: {
    off: '/images/cheeringbadge/votecoin_off.png',
    on: '/images/cheeringbadge/votecoin_on.png',
  },
  REPORT: {
    off: '/images/cheeringbadge/report_off.png',
    on: '/images/cheeringbadge/report_on.png',
  },
  HASHTAG: {
    off: '/images/cheeringbadge/hashtag_off.png',
    on: '/images/cheeringbadge/hashtag_on.png',
  },
  MELONKCHART: {
    off: '/images/cheeringbadge/melonkchart_off.png',
    on: '/images/cheeringbadge/melonkchart_on.png',
  },
  RADIO: {
    off: '/images/cheeringbadge/radio_off.png',
    on: '/images/cheeringbadge/radio_on.png',
  },
  MELONWEEKLY: {
    off: '/images/cheeringbadge/melonweekly_off.png',
    on: '/images/cheeringbadge/melonweekly_on.png',
  },
};

export function getCheeringIcon(
  category: CHEERING_CATEGORY,
  completed = false,
) {
  const badge = CHEERING_BADGE_BY_CATEGORY[category];

  if (!badge) return null;

  return completed ? badge.on : badge.off;
}
