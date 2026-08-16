import Image from 'next/image';
import { getVotePlatformIcon } from '@/constants/vote-platform';

interface VotePlatformIconProps {
  platform: string;
  imageUrl?: string | null;
}

export default function VotePlatformIcon({
  platform,
  imageUrl,
}: VotePlatformIconProps) {
  const iconSrc = imageUrl || getVotePlatformIcon(platform);

  return (
    <div className="relative h-[50px] w-[50px] shrink-0 overflow-hidden rounded-[12px] bg-secondary-1">
      {iconSrc && (
        <Image
          src={iconSrc}
          alt=""
          fill
          unoptimized={Boolean(imageUrl)}
          sizes="50px"
          className="object-contain"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
