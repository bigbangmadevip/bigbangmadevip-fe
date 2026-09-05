import { Platform, PLATFORM_LABEL } from '@/types/music';
import Image from 'next/image';
import Link from 'next/link';

interface MusicGuideLnkButtonProps {
  content: string;
  platform: Platform;
  link: string;
}

const MusicGuideLinkButton = ({
  content,
  platform,
  link,
}: MusicGuideLnkButtonProps) => {
  const iconPlatform =
    platform === 'melonmv' ? 'melon' : platform === 'bugsmv' ? 'bugs' : platform;

  return (
    <>
      <Link
        href={link}
        className="flex justify-between bg-secondary-900 rounded-[16px] p-[16px]"
      >
        <div className="flex items-center gap-[12px]">
          <Image
            className="rounded-full"
            src={`/images/musicguide/filledlogo/${iconPlatform}.png`}
            alt={`${platform}Logo`}
            width={40}
            height={40}
          />
          <div>
            <span className="text-body-15 font-bold">
              {PLATFORM_LABEL[platform]}
            </span>
            <span className="text-body-15">{content}</span>
          </div>
        </div>
        <Image
          src={'/icon/line/arrow-right_gray-24.svg'}
          alt="arrowIcon"
          width={24}
          height={24}
        />
      </Link>
    </>
  );
};

export default MusicGuideLinkButton;
