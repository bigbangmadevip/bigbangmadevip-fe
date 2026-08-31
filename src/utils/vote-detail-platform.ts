// 잘못된 값이 있더라도 URL과의 인덱스 대응을 유지합니다.
export function getVoteDetailPlatforms(value: unknown): string[] {
  const platforms = Array.isArray(value) ? value : typeof value === 'string' ? [value] : [];
  return platforms.map((platform) => typeof platform === 'string' ? platform.trim() : '');
}
