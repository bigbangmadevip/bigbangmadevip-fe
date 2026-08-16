import Image from 'next/image';
import { getVotePlatformIcon } from '@/constants/vote-platform';

interface VotePlatformIconProps {
  platform: string;
}

export default function VotePlatformIcon({
  platform,
}: VotePlatformIconProps) {
  const iconSrc = getVotePlatformIcon(platform);

  return (
    <div className="relative h-[50px] w-[50px] shrink-0 overflow-hidden rounded-[12px] bg-secondary-1">
      {iconSrc && (
        <Image
          src={iconSrc}
          alt=""
          fill
          sizes="50px"
          className="object-contain"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
