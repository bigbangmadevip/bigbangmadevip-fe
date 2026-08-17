'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { SERVICE_NOTICES } from '@/constants/service-notices';
import ServiceNoticeListItem from './ServiceNoticeListItem';

export default function ServiceNoticeContainer() {
  const router = useRouter();

  return (
    <main>
      <PageHeader
        title="공지사항"
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

      {SERVICE_NOTICES.length > 0 ? (
        <div className="mt-[8px]">
          {SERVICE_NOTICES.map((notice) => (
            <ServiceNoticeListItem key={notice.id} notice={notice} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[calc(100dvh-env(safe-area-inset-top)-56px)] flex-col items-center justify-center gap-[4px]">
          <Image
            src="/icon/empty.svg"
            alt=""
            width={64}
            height={64}
            aria-hidden="true"
          />
          <p className="text-body-13 text-secondary-500">
            올라온 공지가 없어요.
          </p>
        </div>
      )}
    </main>
  );
}
