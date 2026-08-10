'use client';

import Image from 'next/image';
import { SectionTitle } from '@/components/common/SectionTitle';
import UrgentNoticeBanner from '@/components/common/UrgentNoticeBanner';
import { useMusicStreamingQuery } from '@/hooks/queries/useMusicQuery';
import { formatDateTimeToMinute } from '@/utils/date';
import OneClickBlock from './OneClickBlock';

export default function MusicStreamingContainer() {
  const { data, isPending, isError } = useMusicStreamingQuery();

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
      <UrgentNoticeBanner title={data.urgent?.urgentContent ?? ''} link="" />

      <div className="mb-[32px]">
        <SectionTitle>원클릭 스트리밍</SectionTitle>
        <div className="grid grid-cols-3 gap-[8px]">
          {data.platforms.map((platform) => (
            <OneClickBlock
              key={platform.platformId}
              id={platform.platformId.toString()}
              platform={platform.name}
              links={platform.osGroups}
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

        <div className="relative h-[440px] w-full overflow-hidden rounded-[16px]">
          <Image
            className="rounded-[16px] object-cover"
            src="/streaming_list.png"
            alt="streamingList"
            fill
            priority
            sizes="(max-width: 430px) calc(100vw - 40px), 390px"
          />
        </div>
      </div>
    </>
  );
}
