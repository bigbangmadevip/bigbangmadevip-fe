import Image from 'next/image';
import Link from 'next/link';

export interface MusicNoticeListItemProps {
  noticeId: string;
  title: string;
  date: string;
  pinned?: boolean;
  showThumbnail?: boolean;
  thumbnailSrc?: string;
}

export default function MusicNoticeListItem({
  noticeId,
  title,
  date,
  pinned = true,
  showThumbnail = true,
  thumbnailSrc = '',
}: MusicNoticeListItemProps) {
  return (
    <Link
      href={`/music/notice/${noticeId}`}
      className="block border-b border-secondary-900 last:border-b-0"
    >
      <article className="flex items-center justify-between py-[24px]">
        <div>
          {pinned && (
            <Image src="/icon/pin.svg" alt="" width={14} height={14} />
          )}

          <p className="mt-[8px] line-clamp-2 whitespace-pre-line text-title-15 font-medium text-secondary-1">
            {title}
          </p>
          <time className="mt-[8px] block text-body-12 text-secondary-400">
            {date}
          </time>
        </div>

        {showThumbnail && (
          <div className="relative h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[12px] bg-secondary-800">
            {thumbnailSrc && (
              <Image
                src={thumbnailSrc}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            )}
          </div>
        )}
      </article>
    </Link>
  );
}
