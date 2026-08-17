import { Platform } from '@/types/music';
import MusicGuideLinkButton from './MusicGuideLinkButton';
import { SectionTitle } from '@/components/common/SectionTitle';

interface TEMP_TYPE {
  id: string;
  platform: Platform;
  link: string;
}

const STREAMING_NATIONAL_GUIDE_MOCK: TEMP_TYPE[] = [
  { id: '0', platform: 'melon', link: '/music/guide/streaming/melon' },
  { id: '1', platform: 'genie', link: '' },
  { id: '2', platform: 'bugs', link: '' },
  { id: '3', platform: 'flo', link: '' },
  { id: '4', platform: 'vibe', link: '' },
  // { id: '5', platform: 'samsungmusic', link: '' },
  // { id: '6', platform: 'kakaomusic', link: '' },
];

const STREMING_INTERNATIONAL_GUIDE_MOCK: TEMP_TYPE[] = [
  // { id: '0', platform: 'spotify', link: '' },
  // { id: '1', platform: 'youtubemusic', link: '' },
  // { id: '2', platform: 'applemusic', link: '' },
  // { id: '3', platform: 'linemusic', link: '' },
  // { id: '4', platform: 'stationhead', link: '' },
];

const MusicGuideStreaming = () => {
  return (
    <>
      <SectionTitle>국내 음원 사이트</SectionTitle>
      <div className="flex flex-col gap-[8px] mb-[32px]">
        {STREAMING_NATIONAL_GUIDE_MOCK.map((item) => (
          <MusicGuideLinkButton
            key={item.id}
            content={' 스트리밍 가이드'}
            platform={item.platform}
            link={item.link}
          />
        ))}
      </div>
      {/* <SectionTitle>해외 음원 사이트</SectionTitle> */}
      <div className="flex flex-col gap-[8px] mb-[32px]">
        {STREMING_INTERNATIONAL_GUIDE_MOCK.map((item) => (
          <MusicGuideLinkButton
            key={item.id}
            content={' 스트리밍 가이드'}
            platform={item.platform}
            link={item.link}
          />
        ))}
      </div>
    </>
  );
};

export default MusicGuideStreaming;
