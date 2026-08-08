import Image from 'next/image';

export type Platform =
  | 'melon'
  | 'genie'
  | 'bugs'
  | 'flo'
  | 'vibe'
  | 'spotify'
  | 'applemusic'
  | 'youtubemusic'
  | 'musicvideo';

export const PLATFORM_LABEL = {
  melon: '멜론',
  genie: '지니',
  bugs: '벅스',
  flo: '플로',
  vibe: '바이브',
  spotify: '스포티파이',
  applemusic: '애플뮤직',
  youtubemusic: '유튜브 뮤직',
  musicvideo: '뮤직비디오',
} satisfies Record<Platform, string>;

export interface OneClickBlockProps {
  id: string;
  platform: Platform;
  links: string[];
}

const OneClickBlock = ({ id, platform, links }: OneClickBlockProps) => {
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
