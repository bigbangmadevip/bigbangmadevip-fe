import { Platform } from '@/types/music';
import MusicGuideLinkButton from './MusicGuideLinkButton';

interface TEMP_TYPE {
  id: string;
  platform: Platform;
  link: string;
}

const RADIOAPPLY_GUIDE_MOCK: TEMP_TYPE[] = [
  { id: '0', platform: 'etc', link: '/music/guide/radioapply/radioapply' },
];

const MusicGuideRadioApply = () => {
  return (
    <>
      <div className="flex flex-col gap-[8px] mb-[32px]">
        {RADIOAPPLY_GUIDE_MOCK.map((item) => (
          <MusicGuideLinkButton
            key={item.id}
            content={' 라디오 신청 가이드'}
            platform={item.platform}
            link={item.link}
          />
        ))}
      </div>
    </>
  );
};

export default MusicGuideRadioApply;
