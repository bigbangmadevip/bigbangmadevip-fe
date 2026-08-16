'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import guideImage from '@/assets/guides/muniverse-vote-guide.png';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';

export default function GuideDetailPage() {
  const router = useRouter();

  return (
    <main>
      <PageHeader
        title="멜론 스트리밍 가이드"
        leftAction={
          <HeaderIconButton
            label="뒤로가기"
            align="start"
            onClick={() => router.back()}
          >
            <Image
              src="/icon/arrow-left_white-24.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </HeaderIconButton>
        }
      />

      <div className="mt-[24px]">
        <Image
          src={guideImage}
          alt="voteGuide"
          priority
          className="h-auto w-full"
        />
      </div>
    </main>
  );
}
