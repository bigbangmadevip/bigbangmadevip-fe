import type { CHEERING_CATEGORY } from '@/types/home';

export const CHEERING_ICON_BY_CATEGORY = {
  STREAMING: '/cheering_streaming.svg',
  DOWNLOAD: null,
  VOTE: '/cheering_vote.svg',
  YOUTUBE: '/cheering_youtube.svg',
  VOTECOIN: null,
  REPORT: '/cheering_report.svg',
  HASHTAG: null,
} satisfies Record<CHEERING_CATEGORY, string | null>;

const CHEERING_COMPLETED_ICON_BY_CATEGORY: Partial<
  Record<CHEERING_CATEGORY, string>
> = {
  STREAMING: '/cheering_streaming_completed.svg',
};

export function getCheeringIcon(
  category: CHEERING_CATEGORY,
  completed = false,
) {
  if (completed) {
    return (
      CHEERING_COMPLETED_ICON_BY_CATEGORY[category] ??
      CHEERING_ICON_BY_CATEGORY[category]
    );
  }

  return CHEERING_ICON_BY_CATEGORY[category];
}
