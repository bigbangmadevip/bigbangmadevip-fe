import Image from 'next/image';
import Link from 'next/link';
import type { VoteGuideContent } from './mock';

const VoteGuideBox = ({
  title,
  href,
  thumbnailSrc,
  caption,
  description,
  platform,
}: VoteGuideContent) => {
  const hasPlatforms = Boolean(platform?.length);
  const guideSummary = (
    <>
      {thumbnailSrc ? (
        <div className="relative h-[84px] w-[84px] shrink-0 overflow-hidden rounded-[16px]">
          <Image
            src={thumbnailSrc}
            alt={`${title ?? '투표'} 가이드 썸네일`}
            fill
            sizes="84px"
            className="object-cover"
          />
        </div>
      ) : (
        <div
          aria-label="가이드 썸네일 영역"
          className="h-[84px] w-[84px] shrink-0 rounded-[16px] bg-secondary-800"
        />
      )}

      <div className="min-w-0 flex-1 py-[5.5px]">
        {caption && (
          <p className="mb-[16px] truncate text-body-13 text-secondary-500">
            {caption}
          </p>
        )}
        <div className="flex justify-between">
          <div className="min-w-0">
            <p className="truncate text-title-15 font-medium text-secondary-1">
              <strong>{title}</strong> 투표 가이드
            </p>
            <p className="mt-[4px] truncate text-body-12 text-secondary-300">
              {description ?? '투표 비율 반영과 참여 방법 안내'}
            </p>
          </div>
          <Image
            src="/icon/line/arrow-right_gray-24.svg"
            alt=""
            width={24}
            height={24}
            className="mr-[8px] shrink-0"
          />
        </div>
      </div>
    </>
  );

  return (
    <article className="rounded-[16px] border border-secondary-900 bg-secondary-900 p-[16px]">
      {title && hasPlatforms && (
        <h2 className="mb-[18px] text-title-17 font-bold text-secondary-1">
          {title}
        </h2>
      )}

      {href ? (
        <Link
          href={href}
          className={`flex items-center gap-[16px] ${
            hasPlatforms
              ? 'mb-[20px] border-b border-b-secondary-800 pb-[24px]'
              : ''
          }`}
        >
          {guideSummary}
        </Link>
      ) : (
        <div
          className={`flex items-center gap-[16px] ${
            hasPlatforms
              ? 'mb-[20px] border-b border-b-secondary-800 pb-[24px]'
              : ''
          }`}
        >
          {guideSummary}
        </div>
      )}

      {hasPlatforms && (
        <section>
          <h3 className="text-title-15 font-medium text-secondary-1">
            사용 투표 플랫폼
          </h3>

          <div
            className={`mt-[12px] grid gap-[7px] ${
              platform?.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
            }`}
          >
            {platform?.map((item, index) => {
              const platformContent = (
                <>
                  <div className="flex gap-[8px]">
                    {item.iconSrc ? (
                      <Image
                        src={item.iconSrc}
                        alt=""
                        width={34}
                        height={34}
                        className="h-[34px] w-[34px] shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="h-[34px] w-[34px] shrink-0 rounded-full bg-secondary-950"
                      />
                    )}

                    <div className="min-w-0">
                      <p className="truncate text-body-13 font-bold text-secondary-1">
                        {item.title}
                      </p>
                      <p className="truncate text-body-11 font-medium text-secondary-500">
                        {item.caption ?? '투표 가이드'}
                      </p>
                    </div>
                  </div>
                  <Image
                    src="/icon/line/arrow-right_gray-24.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </>
              );
              const platformClassName =
                'flex min-w-0 items-center justify-between gap-[8px] rounded-[12px] bg-secondary-800 p-[12px]';

              return href && item.anchorId ? (
                <Link
                  key={`${item.title}-${index}`}
                  href={`${href}#vote-guide-${item.anchorId}`}
                  className={platformClassName}
                >
                  {platformContent}
                </Link>
              ) : (
                <div
                  key={`${item.title}-${index}`}
                  className={platformClassName}
                >
                  {platformContent}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
};

export default VoteGuideBox;
