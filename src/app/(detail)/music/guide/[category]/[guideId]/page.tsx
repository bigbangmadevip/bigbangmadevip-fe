'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import CommonErrorScreen from '@/components/common/CommonErrorScreen';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import type { Platform } from '@/types/music';
import { PLATFORM_LABEL } from '@/types/music';

type StreamingGuidePlatform = Extract<
  Platform,
  'melon' | 'genie' | 'bugs' | 'flo' | 'vibe' | 'spotify' | 'youtubemusic'
>;

type DownloadGuidePlatform = Extract<
  Platform,
  'melon' | 'genie' | 'bugs' | 'kakaomusic'
>;

export type ImageSize = {
  src: string;
  width: number;
  height: number;
};

const DOWNLOAD_GUIDE_IMAGES: Record<DownloadGuidePlatform, ImageSize> = {
  melon: {
    src: '/images/musicguide/download/melon.jpg',
    width: 2000,
    height: 7880,
  },
  genie: {
    src: '/images/musicguide/download/genie.jpg',
    width: 2000,
    height: 8402,
  },
  bugs: {
    src: '/images/musicguide/download/bugs.jpg',
    width: 2000,
    height: 7348,
  },
  kakaomusic: {
    src: '/images/musicguide/download/kakaomusic.jpg',
    width: 2000,
    height: 4374,
  },
};

const STREAMING_GUIDE_IMAGES: Record<StreamingGuidePlatform, ImageSize> = {
  melon: {
    src: '/images/musicguide/streaming/melon.jpg',
    width: 2000,
    height: 9808,
  },
  genie: {
    src: '/images/musicguide/streaming/genie.jpg',
    width: 2000,
    height: 7524,
  },
  bugs: {
    src: '/images/musicguide/streaming/bugs.jpg',
    width: 2000,
    height: 8806,
  },
  flo: {
    src: '/images/musicguide/streaming/flo.jpg',
    width: 2000,
    height: 9070,
  },
  vibe: {
    src: '/images/musicguide/streaming/vibe.jpg',
    width: 2000,
    height: 10204,
  },
  spotify: {
    src: '/images/musicguide/streaming/spotify.jpg',
    width: 2000,
    height: 7096,
  },
  youtubemusic: {
    src: '/images/musicguide/streaming/youtubemusic.jpg',
    width: 2000,
    height: 11922,
  },
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
            width={STREAMING_GUIDE_IMAGES[guideId].width}
            height={STREAMING_GUIDE_IMAGES[guideId].height}
            className="h-auto w-full bg-secondary-950"
          />
        ) : (
          <Image
            src={DOWNLOAD_GUIDE_IMAGES[guideId as DownloadGuidePlatform]}
            alt={title}
            priority
            width={
              DOWNLOAD_GUIDE_IMAGES[guideId as DownloadGuidePlatform].width
            }
            height={
              DOWNLOAD_GUIDE_IMAGES[guideId as DownloadGuidePlatform].height
            }
            className="h-auto w-full bg-secondary-950"
          />
        )}
      </div>

      <FloatingShareButton title={title} />
    </main>
  );
}
