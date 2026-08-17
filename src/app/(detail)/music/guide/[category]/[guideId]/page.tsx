'use client';

import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import bugsGuideImage from '@/assets/musicguide/bugs.png';
import floGuideImage from '@/assets/musicguide/flo.png';
import genieGuideImage from '@/assets/musicguide/genie.png';
import melonGuideImage from '@/assets/musicguide/melon.png';
import CommonErrorScreen from '@/components/common/CommonErrorScreen';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import type { Platform } from '@/types/music';
import { PLATFORM_LABEL } from '@/types/music';

type StreamingGuidePlatform = Extract<
  Platform,
  'melon' | 'genie' | 'bugs' | 'flo'
>;

const STREAMING_GUIDE_IMAGES: Record<StreamingGuidePlatform, StaticImageData> =
  {
    melon: melonGuideImage,
    genie: genieGuideImage,
    bugs: bugsGuideImage,
    flo: floGuideImage,
  };

function isStreamingGuidePlatform(
  value: string,
): value is StreamingGuidePlatform {
  return value in STREAMING_GUIDE_IMAGES;
}

export default function GuideDetailPage() {
  const router = useRouter();
  const { category, guideId } = useParams<{
    category: string;
    guideId: string;
  }>();

  if (category !== 'streaming' || !isStreamingGuidePlatform(guideId)) {
    return <CommonErrorScreen message="준비되지 않은 음원 가이드예요." />;
  }

  const title = `${PLATFORM_LABEL[guideId]} 스트리밍 가이드`;

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
        <Image
          src={STREAMING_GUIDE_IMAGES[guideId]}
          alt={title}
          priority
          placeholder="blur"
          sizes="(max-width: 430px) 100vw, 390px"
          className="h-auto w-full bg-secondary-950"
        />
      </div>

      <FloatingShareButton title={title} />
    </main>
  );
}
