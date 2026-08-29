import { Platform } from '@/types/music';
import MusicGuideLinkButton from './MusicGuideLinkButton';

interface TEMP_TYPE {
  id: string;
  platform: Platform;
  link: string;
}

const STREAMING_NATIONAL_GUIDE_MOCK: TEMP_TYPE[] = [
  { id: '0', platform: 'youtube', link: '/music/guide/replay/youtubemv' },
];

const MusicGuideReplay = () => {
  return (
    <>
      <div className="flex flex-col gap-[8px] mb-[32px]">
        {STREAMING_NATIONAL_GUIDE_MOCK.map((item) => (
          <MusicGuideLinkButton
            key={item.id}
            content={' 반복재생 가이드'}
            platform={item.platform}
            link={item.link}
          />
        ))}
      </div>
    </>
  );
};

export default MusicGuideReplay;
