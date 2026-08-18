import { Platform } from '@/types/music';
import { SectionTitle } from '@/components/common/SectionTitle';
import MusicGuideLinkButton from './MusicGuideLinkButton';

interface TEMP_TYPE {
  id: string;
  platform: Platform;
  link: string;
}

const DOWNLOAD_GUIDES: TEMP_TYPE[] = [
  { id: '0', platform: 'melon', link: '/music/guide/download/melon' },
  { id: '1', platform: 'genie', link: '/music/guide/download/genie' },
  { id: '2', platform: 'bugs', link: '/music/guide/download/bugs' },
  {
    id: '3',
    platform: 'kakaomusic',
    link: '/music/guide/download/kakaomusic',
  },
];

const MusicGuideDownload = () => {
  return (
    <>
      <SectionTitle>국내 음원 사이트</SectionTitle>
      <div className="mb-[32px] flex flex-col gap-[8px]">
        {DOWNLOAD_GUIDES.map((item) => (
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
