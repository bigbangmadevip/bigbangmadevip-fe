import Image from 'next/image';
import Link from 'next/link';
import type { ServiceNotice } from '@/constants/service-notices';

type ServiceNoticeListItemProps = {
  notice: ServiceNotice;
};

export default function ServiceNoticeListItem({
  notice,
}: ServiceNoticeListItemProps) {
  return (
    <Link
      href={`/mypage/settings/notices/${notice.id}`}
      className="block border-b border-secondary-900 last:border-b-0"
    >
      <article className="py-[20px]">
        {notice.pinned && (
          <Image
            src="/icon/pin.svg"
            alt="고정 공지"
            width={14}
            height={14}
          />
        )}
        <h2 className="mt-[8px] line-clamp-2 text-body-14 font-medium text-secondary-1">
          {notice.title}
        </h2>
        <time className="mt-[8px] block text-body-12 text-secondary-600">
          {notice.createdAt}
        </time>
      </article>
    </Link>
  );
}
