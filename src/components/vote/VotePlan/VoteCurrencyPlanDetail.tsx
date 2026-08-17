'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import voteCoinImage from '@/assets/voteplan/votecoin.png';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionTitle } from '@/components/common/SectionTitle';

const CURRENCY_GUIDES = [
  {
    id: 'idolchamp',
    label: '아이돌챔프',
    iconSrc: '/icon/vote/idolchamp.svg',
    href: '/vote/guide/showchampion#vote-guide-idolchamp',
  },
  {
    id: 'coogoong',
    label: '쿠궁',
    iconSrc: '/icon/vote/coogoong.svg',
    href: '/vote/guide/musicbank#vote-guide-coogoong',
  },
  {
    id: 'mubeat',
    label: '뮤빗',
    iconSrc: '/icon/vote/mubeat.svg',
    href: '/vote/guide/musiccore#vote-guide-mubeat',
  },
  {
    id: 'muniverse',
    label: '뮤니버스',
    iconSrc: '/icon/vote/muniverse.svg',
    href: '/vote/guide/musiccore#vote-guide-muniverse',
  },
  {
    id: 'linc',
    label: '링크',
    iconSrc: '/icon/vote/linc.svg',
    href: '/vote/guide/inkigayo#vote-guide-linc',
  },
  {
    id: 'higher',
    label: '하이어',
    iconSrc: '/icon/vote/higher.svg',
    href: '/vote/guide/inkigayo#vote-guide-higher',
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
              src="/icon/line/arrow-left_white-28.svg"
              alt=""
              width={28}
              height={28}
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
        <SectionTitle>재화 적립하러 가기</SectionTitle>

        <div className="mt-[12px] grid grid-cols-3 gap-[8px]">
          {CURRENCY_GUIDES.map((guide) => (
            <Link
              key={guide.id}
              href={guide.href}
              className="flex flex-col items-center justify-center gap-[2px] rounded-[16px] bg-secondary-900 px-[21px] py-[14px]"
            >
              <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
                <Image
                  src={guide.iconSrc}
                  alt=""
                  width={28}
                  height={28}
                  aria-hidden="true"
                  className="h-[28px] w-[28px] rounded-full object-contain"
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
