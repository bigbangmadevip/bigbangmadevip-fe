'use client';

import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import bugsDownloadGuideImage from '../../../../../../../public/musicguide/download/bugs.png';
import genieDownloadGuideImage from '../../../../../../../public/musicguide/download/genie.png';
import kakaomusicDownloadGuideImage from '../../../../../../../public/musicguide/download/kakaomusic.png';
import melonDownloadGuideImage from '../../../../../../../public/musicguide/download/melon.png';
import bugsGuideImage from '@/assets/musicguide/bugs.png';
import floGuideImage from '@/assets/musicguide/flo.png';
import genieGuideImage from '@/assets/musicguide/genie.png';
import melonGuideImage from '@/assets/musicguide/melon.png';
import vibeGuideImage from '@/assets/musicguide/vibe.png';
import CommonErrorScreen from '@/components/common/CommonErrorScreen';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import type { Platform } from '@/types/music';
import { PLATFORM_LABEL } from '@/types/music';

type StreamingGuidePlatform = Extract<
  Platform,
  'melon' | 'genie' | 'bugs' | 'flo' | 'vibe'
>;

type DownloadGuidePlatform = Extract<
  Platform,
  'melon' | 'genie' | 'bugs' | 'kakaomusic'
>;

const DOWNLOAD_GUIDE_IMAGES: Record<DownloadGuidePlatform, StaticImageData> = {
  melon: melonDownloadGuideImage,
  genie: genieDownloadGuideImage,
  bugs: bugsDownloadGuideImage,
  kakaomusic: kakaomusicDownloadGuideImage,
};

const STREAMING_GUIDE_IMAGES: Record<StreamingGuidePlatform, StaticImageData> =
  {
    melon: melonGuideImage,
    genie: genieGuideImage,
    bugs: bugsGuideImage,
    flo: floGuideImage,
    vibe: vibeGuideImage,
  };

function isStreamingGuidePlatform(
  value: string,
): value is StreamingGuidePlatform {
  return value in STREAMING_GUIDE_IMAGES;
}

function isDownloadGuidePlatform(
  value: string,
): value is DownloadGuidePlatform {
  return value in DOWNLOAD_GUIDE_IMAGES;
}

export default function GuideDetailPage() {
  const router = useRouter();
  const { category, guideId } = useParams<{
    category: string;
    guideId: string;
  }>();
  const isStreamingGuide =
    category === 'streaming' && isStreamingGuidePlatform(guideId);
  const isDownloadGuide =
    category === 'download' && isDownloadGuidePlatform(guideId);

  if (!isStreamingGuide && !isDownloadGuide) {
    return <CommonErrorScreen message="준비되지 않은 음원 가이드예요." />;
  }

  const guideTypeLabel = isStreamingGuide ? '스트리밍' : '다운로드';
  const title = `${PLATFORM_LABEL[guideId]} ${guideTypeLabel} 가이드`;

  return (
    <main>
      <PageHeader
        title={title}
        leftAction={
          <HeaderIconButton
            label="뒤로가기"
            align="start"
            onClick={() => router.back()}
          >
            <Image
              src="/icon/line/arrow-left_white-28.svg"
              alt=""
              width={28}
              height={28}
              aria-hidden="true"
            />
          </HeaderIconButton>
        }
      />

      <div className="mt-[24px]">
        {isStreamingGuide ? (
          <Image
            src={STREAMING_GUIDE_IMAGES[guideId]}
            alt={title}
            priority
            placeholder="blur"
            sizes="(max-width: 430px) 100vw, 390px"
            className="h-auto w-full bg-secondary-950"
          />
        ) : (
          <Image
            src={DOWNLOAD_GUIDE_IMAGES[guideId as DownloadGuidePlatform]}
            alt={title}
            sizes="(max-width: 430px) 100vw, 390px"
            placeholder="blur"
            className="block h-auto w-full"
          />
        )}
      </div>

      <FloatingShareButton title={title} />
    </main>
  );
}
