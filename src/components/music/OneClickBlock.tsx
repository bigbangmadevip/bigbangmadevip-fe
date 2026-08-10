import {
  type MusicStreamingOsGroup,
  type Platform,
  PLATFORM_LABEL,
} from '@/types/music';
import Image from 'next/image';

export interface OneClickBlockProps {
  id: string;
  platform: Platform;
  links: MusicStreamingOsGroup[];
}

const OneClickBlock = ({ platform }: OneClickBlockProps) => {
  return (
    <div className="flex flex-col gap-[2px] justify-center items-center min-h-[88px] rounded-[16px] bg-secondary-900">
      <Image
        src={`/icon/music/${platform}.svg`}
        alt={platform}
        width={40}
        height={40}
      />
      <p className="text-body-13">{PLATFORM_LABEL[platform]}</p>
    </div>
  );
};

export default OneClickBlock;
