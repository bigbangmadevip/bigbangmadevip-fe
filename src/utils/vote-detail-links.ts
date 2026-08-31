import type { VoteDetailResponse } from '@/types/vote';
import { getVoteDetailPlatforms } from '@/utils/vote-detail-platform';

export type VoteDetailLink = {
  label: string;
  url: string;
  platformName?: string;
};

export function getVoteDetailLinks(detail: VoteDetailResponse): VoteDetailLink[] {
  const urls = Array.isArray(detail.platformUrl)
    ? detail.platformUrl
    : typeof detail.platformUrl === 'string'
      ? [detail.platformUrl]
      : [];

  const platforms = getVoteDetailPlatforms(detail.platformNames);
  // 빈 URL을 제거하기 전에 같은 인덱스의 플랫폼을 연결합니다.
  return urls.flatMap((url, index) => {
    if (typeof url !== 'string' || !url.trim()) return [];
    const platformName = platforms[index];
    return [{
      url: url.trim(),
      platformName,
      label: platformName || detail.ctaButtonLabel || '투표하러 가기',
    }];
  });
}
