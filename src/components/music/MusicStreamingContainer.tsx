'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/common/SectionTitle';
import UrgentNoticeBanner from '@/components/common/UrgentNoticeBanner';
import { useMusicStreamingQuery } from '@/hooks/queries/useMusicQuery';
import type { MusicOs, MusicStreamingPlatform } from '@/types/music';
import { formatDateTimeToMinute } from '@/utils/date';
import OneClickBlock from './OneClickBlock';
import OneClickStreamingSheet, {
  detectMusicOs,
} from './OneClickStreamingSheet';

export default function MusicStreamingContainer() {
  const { data, isPending, isError } = useMusicStreamingQuery();
  const [selectedPlatform, setSelectedPlatform] =
    useState<MusicStreamingPlatform | null>(null);
  const [currentOs, setCurrentOs] = useState<MusicOs | null>(null);

  const openOneClickSheet = (platform: MusicStreamingPlatform) => {
    setCurrentOs(detectMusicOs());
    setSelectedPlatform(platform);
  };

  if (isPending) {
    return (
      <div className="py-[64px] text-center text-body-13 text-secondary-500">
        스트리밍 정보를 불러오는 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-[64px] text-center text-body-13 text-secondary-500">
        스트리밍 정보를 불러오지 못했어요.
      </div>
    );
  }

  return (
    <>
      {data.urgent && (
        <UrgentNoticeBanner
          title={data.urgent.urgentContent}
          link={`/urgent/${data.urgent.detailId}?menuType=MUSIC`}
        />
      )}

      <div className="mb-[32px]">
        <SectionTitle>원클릭 스트리밍</SectionTitle>
        <div className="grid grid-cols-3 gap-[8px]">
          {data.platforms.map((platform) => (
            <OneClickBlock
              key={platform.platformId}
              platform={platform}
              onClick={() => openOneClickSheet(platform)}
            />
          ))}
        </div>
      </div>

      <div>
        <SectionTitle
          action={
            <div className="flex items-baseline">
              <span className="text-body-13 text-secondary-400">
                최신 업데이트
              </span>
              <span className="px-[6px] text-body-13 font-bold text-secondary-700">
                |
              </span>
              <span className="text-body-13 text-secondary-400">
                {formatDateTimeToMinute(data.imagesUpdatedAt)}
              </span>
            </div>
          }
        >
          스트리밍 리스트
        </SectionTitle>

        {data.streamingImageUrls.length > 0 ? (
          <div className="scrollbar-hidden -mx-5 flex snap-x snap-mandatory gap-[12px] overflow-x-auto px-5">
            {data.streamingImageUrls.map((imageUrl, index) => (
              <div
                key={`${imageUrl}-${index}`}
                role="img"
                aria-label={`스트리밍 리스트 ${index + 1}`}
                className="aspect-[335/440] w-full shrink-0 snap-center rounded-[16px] bg-secondary-900 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            ))}
          </div>
        ) : (
          <div className="flex aspect-[335/440] w-full items-center justify-center rounded-[16px] bg-secondary-900 text-body-13 text-secondary-500">
            등록된 스트리밍 이미지가 없어요.
          </div>
        )}
      </div>

      <OneClickStreamingSheet
        open={selectedPlatform !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPlatform(null);
        }}
        platform={selectedPlatform}
        os={currentOs}
      />
    </>
  );
}
