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
  '유튜브 뮤직': 'youtubemusic',
};

const OneClickBlock = ({ platform, onClick }: OneClickBlockProps) => {
  const iconKey = PLATFORM_ICON_KEYS[platform.name.toLowerCase()];
  const platformLabel = getPlatformKoreanLabel(platform.name);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[88px] flex-col items-center justify-center gap-[2px] rounded-[16px] bg-secondary-900"
    >
      {platform.iconUrl ? (
        <span
          role="img"
          aria-label={`${platformLabel} 아이콘`}
          className="h-[40px] w-[40px] bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${platform.iconUrl})` }}
        />
      ) : (
        <Image
          src={
            iconKey
              ? `/icon/music/${iconKey}-logo.svg`
              : '/icon/guide/musicwave-filled.svg'
          }
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
        />
      )}
      <span className="text-body-13 text-secondary-100">{platformLabel}</span>
    </button>
  );
};

export default OneClickBlock;
