import { Platform } from '@/types/music';
import MusicGuideLinkButton from './MusicGuideLinkButton';

interface TEMP_TYPE {
  id: string;
  platform: Platform;
  link: string;
}

const STREAMING_NATIONAL_GUIDE_MOCK: TEMP_TYPE[] = [
  { id: '0', platform: 'genie', link: '/music/guide/createid/genie' },
  // { id: '2', platform: 'bugs', link: '/music/guide/createid/bugs' },
];

const MusicGuideMakeId = () => {
  return (
    <>
      <div className="flex flex-col gap-[8px] mb-[32px]">
        {STREAMING_NATIONAL_GUIDE_MOCK.map((item) => (
          <MusicGuideLinkButton
            key={item.id}
            content={' 아이디 생성 가이드'}
            platform={item.platform}
            link={item.link}
          />
        ))}
      </div>
    </>
  );
};

export default MusicGuideMakeId;
