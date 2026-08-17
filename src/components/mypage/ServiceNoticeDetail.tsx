'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { getServiceNotice } from '@/constants/service-notices';

type ServiceNoticeDetailProps = {
  noticeId: string;
};

export default function ServiceNoticeDetail({
  noticeId,
}: ServiceNoticeDetailProps) {
  const router = useRouter();
  const notice = getServiceNotice(noticeId);

  return (
    <main>
      <PageHeader
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

      {!notice ? (
        <div className="py-[64px] text-center text-body-13 text-secondary-500">
          공지를 찾을 수 없어요.
        </div>
      ) : (
        <article className="mt-[20px]">
          <h1 className="whitespace-pre-line text-[22px] font-bold leading-[1.4] text-secondary-1">
            {notice.title}
          </h1>
          <time className="mb-[24px] mt-[12px] block text-body-12 font-medium text-secondary-600">
            {notice.createdAt}
          </time>
          <div className="border-t border-secondary-900 pt-[32px]">
            <p className="whitespace-pre-line text-body-13 leading-[1.8] text-secondary-100">
              {notice.content}
            </p>
          </div>
        </article>
      )}

      {notice && <FloatingShareButton title={notice.title} />}
    </main>
  );
}
