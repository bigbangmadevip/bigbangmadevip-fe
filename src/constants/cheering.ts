import hashtagOff from '@/assets/cheeringbadge/hashtag_off.png';
import hashtagOn from '@/assets/cheeringbadge/hashtag_on.png';
import melonKChartOff from '@/assets/cheeringbadge/melonkchart_off.png';
import melonKChartOn from '@/assets/cheeringbadge/melonkchart_on.png';
import radioOff from '@/assets/cheeringbadge/radio_off.png';
import radioOn from '@/assets/cheeringbadge/radio_on.png';
import reportOff from '@/assets/cheeringbadge/report_off.png';
import reportOn from '@/assets/cheeringbadge/report_on.png';
import streamingOff from '@/assets/cheeringbadge/streaming_off.png';
import streamingOn from '@/assets/cheeringbadge/streaming_on.png';
import voteCoinOff from '@/assets/cheeringbadge/votecoin_off.png';
import voteCoinOn from '@/assets/cheeringbadge/votecoin_on.png';
import youtubeOff from '@/assets/cheeringbadge/youtube_off.png';
import youtubeOn from '@/assets/cheeringbadge/youtube_on.png';
import type { CHEERING_CATEGORY } from '@/types/home';

const CHEERING_BADGE_BY_CATEGORY = {
  STREAMING: { off: streamingOff, on: streamingOn },
  DOWNLOAD: null,
  VOTE: null,
  YOUTUBE: { off: youtubeOff, on: youtubeOn },
  VOTECOIN: { off: voteCoinOff, on: voteCoinOn },
  REPORT: { off: reportOff, on: reportOn },
  HASHTAG: { off: hashtagOff, on: hashtagOn },
  MELONKCHART: { off: melonKChartOff, on: melonKChartOn },
  RADIO: { off: radioOff, on: radioOn },
} satisfies Record<
  CHEERING_CATEGORY,
  { off: typeof streamingOff; on: typeof streamingOn } | null
>;

export function getCheeringIcon(
  category: CHEERING_CATEGORY,
  completed = false,
) {
  const badge = CHEERING_BADGE_BY_CATEGORY[category];

  if (!badge) return null;

  return completed ? badge.on : badge.off;
}
