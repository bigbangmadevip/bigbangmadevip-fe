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
  | 'melon'
  | 'genie'
  | 'bugs'
  | 'flo'
  | 'vibe'
  | 'spotify'
  | 'youtubemusic'
  | 'applemusic'
>;

type DownloadGuidePlatform = Extract<
  Platform,
  'melon' | 'genie' | 'bugs' | 'kakaomusic' | 'vcoloring' | 'melonmv' | 'bugsmv'
>;

type GenieShareGuideId = 'genieshare';
type ReplayGuideId = 'youtubemv';

type YoutubeMvGuideId = 'youtubemv';

type RadioApplyGuideId = 'radioapply';

type CreateIdGuideId = 'genie';

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
  melonmv: {
    src: '/images/musicguide/download/melonmv.png',
    width: 750,
    height: 3900,
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
  bugsmv: {
    src: '/images/musicguide/download/bugsmv.png',
    width: 750,
    height: 3570,
  },
  kakaomusic: {
    src: '/images/musicguide/download/kakaomusic.jpg',
    width: 2000,
    height: 4374,
  },
  vcoloring: {
    src: '/images/musicguide/download/vcoloring.png',
    width: 1870,
    height: 6067,
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
  applemusic: {
    src: '/images/musicguide/streaming/applemusic.jpg',
    width: 2000,
    height: 8542,
  },
};

const GENIESHARE_GUIDE_IMAGES: Record<GenieShareGuideId, ImageSize> = {
  genieshare: {
    src: '/images/musicguide/genieshare/genieshare.jpg',
    width: 1086,
    height: 1448,
  },
};

const REPLAY_GUIDE_IMAGES: Record<ReplayGuideId, ImageSize> = {
  youtubemv: {
    src: '/images/musicguide/replay/youtubemv.JPG',
    width: 2500,
    height: 6248,
  },
};

const YOUTUBEMV_GUIDE_IMAGES: Record<YoutubeMvGuideId, ImageSize> = {
  youtubemv: {
    src: '/images/musicguide/replay/youtubemv.jpg',
    width: 2500,
    height: 6248,
  },
};

const RADIOAPPLY_GUIDE_IMAGES: Record<RadioApplyGuideId, ImageSize> = {
  radioapply: {
    src: '/images/musicguide/radioapply/radioapply.jpg',
    width: 1920,
    height: 3672,
  },
};

const CREATEID__GUIDE_IMAGES: Record<CreateIdGuideId, ImageSize> = {
  genie: {
    src: '/images/musicguide/createid/genie.png',
    width: 750,
    height: 2060,
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

function isGenieShareGuideId(value: string): value is GenieShareGuideId {
  return value in GENIESHARE_GUIDE_IMAGES;
}

function isReplayGuideId(value: string): value is ReplayGuideId {
  return value in REPLAY_GUIDE_IMAGES;
}

function isYoutubeMvGuideId(value: string): value is YoutubeMvGuideId {
  return value in YOUTUBEMV_GUIDE_IMAGES;
}

function isRadioApplyGuideId(value: string): value is RadioApplyGuideId {
  return value in RADIOAPPLY_GUIDE_IMAGES;
}

function isCreateIdGuideId(value: string): value is CreateIdGuideId {
  return value in CREATEID__GUIDE_IMAGES;
}

function getGuideDetail(category: string, guideId: string) {
  if (category === 'streaming' && isStreamingGuidePlatform(guideId)) {
    return {
      image: STREAMING_GUIDE_IMAGES[guideId],
      title: `${PLATFORM_LABEL[guideId]} 스트리밍 가이드`,
    };
  }

  if (category === 'download' && isDownloadGuidePlatform(guideId)) {
    return {
      image: DOWNLOAD_GUIDE_IMAGES[guideId],
      title: `${PLATFORM_LABEL[guideId]} 다운로드 가이드`,
    };
  }

  if (category === 'genieshare' && isGenieShareGuideId(guideId)) {
    return {
      image: GENIESHARE_GUIDE_IMAGES[guideId],
      title: '지니 음악 나누기 가이드',
    };
  }

  if (category === 'youtubemv' && isYoutubeMvGuideId(guideId)) {
    return {
      image: YOUTUBEMV_GUIDE_IMAGES[guideId],
      title: '유튜브 뮤비 스트리밍 가이드',
    };
  }

  if (category === 'replay' && isReplayGuideId(guideId)) {
    return {
      image: REPLAY_GUIDE_IMAGES[guideId],
      title: '유튜브 뮤직 반복재생 가이드',
    };
  }

  if (category === 'radioapply' && isRadioApplyGuideId(guideId)) {
    return {
      image: RADIOAPPLY_GUIDE_IMAGES[guideId],
      title: '빅뱅 라디오 신청 가이드',
    };
  }

  if (category === 'createid' && isCreateIdGuideId(guideId)) {
    return {
      image: CREATEID__GUIDE_IMAGES[guideId],
      title: '아이디 생성 가이드',
    };
  }

  return null;
}

export default function GuideDetailPage() {
  const router = useRouter();
  const { category, guideId } = useParams<{
    category: string;
    guideId: string;
  }>();
  const guideDetail = getGuideDetail(category, guideId);

  if (!guideDetail) {
    return <CommonErrorScreen message="준비되지 않은 음원 가이드예요." />;
  }

  const { image, title } = guideDetail;

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
          src={image.src}
          alt={title}
          priority
          width={image.width}
          height={image.height}
          className="h-auto w-full bg-secondary-950"
        />
      </div>

      <FloatingShareButton title={title} />
    </main>
  );
}
