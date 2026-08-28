import { Platform } from '@/types/music';
import MusicGuideLinkButton from './MusicGuideLinkButton';

interface TEMP_TYPE {
  id: string;
  platform: Platform;
  link: string;
}

const GUIDES: TEMP_TYPE[] = [
  {
    id: '0',
    platform: 'genie',
    link: '/music/guide/genieshare/genieshare',
  },
];

const MusicGuideGenieShare = () => {
  return (
    <>
      <div className="mb-[32px] flex flex-col gap-[8px]">
        {GUIDES.map((item) => (
          <MusicGuideLinkButton
            key={item.id}
            content={' 음악 나누기 가이드'}
            platform={item.platform}
            link={item.link}
          />
        ))}
      </div>
    </>
  );
};

export default MusicGuideGenieShare;
