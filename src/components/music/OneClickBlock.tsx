import Image from 'next/image';
import { getPlatformKoreanLabel } from '@/constants/platform';
import type { MusicStreamingPlatform, Platform } from '@/types/music';

export interface OneClickBlockProps {
  platform: MusicStreamingPlatform;
  onClick: () => void;
}

const PLATFORM_ICON_KEYS: Partial<Record<string, Platform>> = {
  melon: 'melon',
  멜론: 'melon',
  genie: 'genie',
  지니: 'genie',
  bugs: 'bugs',
  벅스: 'bugs',
  flo: 'flo',
  플로: 'flo',
  vibe: 'vibe',
  바이브: 'vibe',
  samsungmusic: 'samsungmusic',
  삼성뮤직: 'samsungmusic',
  spotify: 'spotify',
  스포티파이: 'spotify',
  applemusic: 'applemusic',
  애플뮤직: 'applemusic',
  youtubemusic: 'youtubemusic',
  유튜브뮤직: 'youtubemusic',
};

const PLATFORM_ICONS: Partial<Record<Platform, string>> = {
  melon: '/images/musicstreaming/melon-logo.png',
  genie: '/images/musicstreaming/genie-logo.png',
  bugs: '/images/musicstreaming/bugs-logo.png',
  flo: '/images/musicstreaming/flo-logo.png',
  vibe: '/images/musicstreaming/vibe-logo.png',
  samsungmusic: '/images/musicstreaming/samsungmusic-logo.png',
  spotify: '/images/musicstreaming/spotify-logo.png',
  applemusic: '/images/musicstreaming/applemusic-logo.png',
  youtubemusic: '/images/musicstreaming/youtubemusic-logo.png',
};

const PLATFORM_ICONS_BY_ID: Record<number, string> = {
  1: PLATFORM_ICONS.melon!,
  2: PLATFORM_ICONS.genie!,
  3: PLATFORM_ICONS.bugs!,
  4: PLATFORM_ICONS.flo!,
  5: PLATFORM_ICONS.vibe!,
  6: PLATFORM_ICONS.samsungmusic!,
  7: PLATFORM_ICONS.spotify!,
  8: PLATFORM_ICONS.applemusic!,
  9: PLATFORM_ICONS.youtubemusic!,
};

const OneClickBlock = ({ platform, onClick }: OneClickBlockProps) => {
  const normalizedPlatformName = platform.name
    .trim()
    .toLowerCase()
    .replace(/[\s_-]/g, '');
  const iconKey = PLATFORM_ICON_KEYS[normalizedPlatformName];
  const platformIconSrc =
    PLATFORM_ICONS_BY_ID[platform.platformId] ??
    (iconKey ? PLATFORM_ICONS[iconKey] : undefined);
  const platformLabel = getPlatformKoreanLabel(platform.name);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[88px] flex-col items-center justify-center gap-[2px] rounded-[16px] bg-secondary-900"
    >
      {platformIconSrc ? (
        <Image
          src={platformIconSrc}
          alt=""
          width={40}
          height={40}
          className="h-[40px] w-[40px] object-contain"
        />
      ) : platform.iconUrl ? (
        <span
          role="img"
          aria-label={`${platformLabel} 아이콘`}
          className="h-[40px] w-[40px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${platform.iconUrl})` }}
        />
      ) : (
        <span className="h-[40px] w-[40px] rounded-full bg-secondary-800" />
      )}
      <span className="text-body-13 text-secondary-100">{platformLabel}</span>
    </button>
  );
};

export default OneClickBlock;
