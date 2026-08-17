'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import voteCoinImage from '@/assets/voteplan/votecoin.png';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';

const CURRENCY_GUIDES = [
  {
    id: 'idolchamp',
    label: '아이돌챔프',
    iconSrc: '/icon/vote/voteplan/idolchamp.svg',
    href: '/vote/guide/idolchamp',
  },
  {
    id: 'coogoong',
    label: '쿠궁',
    iconSrc: '/icon/vote/coogoong.svg',
    href: '/vote/guide/coogoong',
  },
  {
    id: 'mubeat',
    label: '뮤빗',
    iconSrc: '/icon/vote/voteplan/mubeat.svg',
    href: '/vote/guide/mubeat',
  },
  {
    id: 'muniverse',
    label: '뮤니버스',
    iconSrc: '/icon/vote/voteplan/muniverse.svg',
    href: '/vote/guide/muniverse',
  },
  {
    id: 'linc',
    label: '링크',
    iconSrc: '/icon/vote/voteplan/linc.svg',
    href: '/vote/guide/linc',
  },
  {
    id: 'higher',
    label: '하이어',
    iconSrc: '/icon/vote/voteplan/higher.svg',
    href: '/vote/guide/higher',
  },
] as const;

export default function VoteCurrencyPlanDetail() {
  const router = useRouter();

  return (
    <main>
      <PageHeader
        sticky
        title="음악방송 재화 모으기 가이드"
        leftAction={
          <HeaderIconButton
            label="뒤로가기"
            align="start"
            onClick={() => router.back()}
          >
            <Image
              src="/icon/line/arrow-left_white-24.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </HeaderIconButton>
        }
      />

      <Image
        src={voteCoinImage}
        alt="음악방송 재화 적립 가이드"
        priority
        sizes="(max-width: 430px) 100vw, 390px"
        className="mt-[24px] h-auto w-full rounded-[16px]"
      />

      <section className="mt-[40px]">
        <h2 className="text-title-17 font-bold text-secondary-1">
          재화 적립하러 가기
        </h2>

        <div className="mt-[16px] grid grid-cols-3 gap-[8px]">
          {CURRENCY_GUIDES.map((guide) => (
            <Link
              key={guide.id}
              href={guide.href}
              className="flex aspect-square min-w-0 flex-col items-center justify-center gap-[10px] rounded-[16px] bg-secondary-900 p-[12px]"
            >
              <span className="relative h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={guide.iconSrc}
                  alt=""
                  fill
                  sizes="40px"
                  aria-hidden="true"
                  className="object-contain"
                />
              </span>
              <span className="w-full truncate text-center text-body-13 font-medium text-secondary-100">
                {guide.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <FloatingShareButton title="음악방송 재화 모으기 가이드" />
    </main>
  );
}
