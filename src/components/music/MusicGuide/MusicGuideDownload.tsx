import { Platform } from '@/types/music';
import MusicGuideLinkButton from './MusicGuideLinkButton';

interface TEMP_TYPE {
  id: string;
  platform: Platform;
  link: string;
}

const STREAMING_NATIONAL_GUIDE_MOCK: TEMP_TYPE[] = [
  { id: '0', platform: 'melon', link: '' },
  { id: '1', platform: 'genie', link: '' },
  { id: '2', platform: 'bugs', link: '' },
  { id: '3', platform: 'flo', link: '' },
  { id: '4', platform: 'vibe', link: '' },
  { id: '5', platform: 'samsungmusic', link: '' },
];

const MusicGuideDownload = () => {
  return (
    <>
      <div className="flex flex-col gap-[8px] mb-[32px]">
        {STREAMING_NATIONAL_GUIDE_MOCK.map((item) => (
          <MusicGuideLinkButton
            key={item.id}
            content={' 다운로드 가이드'}
            platform={item.platform}
            link={item.link}
          />
        ))}
      </div>
    </>
  );
};

export default MusicGuideDownload;
