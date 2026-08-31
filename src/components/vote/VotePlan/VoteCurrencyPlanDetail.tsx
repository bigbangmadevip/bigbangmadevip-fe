'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FloatingShareButton from '@/components/common/FloatingShareButton';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { SectionTitle } from '@/components/common/SectionTitle';
import {
  getVoteAppLink,
  type VoteAppPlatform,
} from '@/constants/vote-app-link';

const CURRENCY_GUIDES = [
  {
    id: 'idolchamp',
    label: '아이돌챔프',
    iconSrc: '/images/voteplan/idolchamp.png',
  },
  {
    id: 'coogoong',
    label: '쿠궁',
    iconSrc: '/images/voteplan/coogoong.png',
  },
  {
    id: 'mubeat',
    label: '뮤빗',
    iconSrc: '/images/voteplan/mubeat.png',
  },
  {
    id: 'muniverse',
    label: '뮤니버스',
    iconSrc: '/images/voteplan/muniverse.png',
  },
  {
    id: 'linc',
    label: '링크',
    iconSrc: '/images/voteplan/linc.png',
  },
  {
    id: 'higher',
    label: '하이어',
    iconSrc: '/images/voteplan/higher.png',
  },
] as const;

export default function VoteCurrencyPlanDetail() {
  const router = useRouter();

  return (
    <main>
      <PageHeader
        sticky
        title="음악방송 재화 모으기"
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
        src={'/images/voteplan/votecoin.png'}
        alt="음악방송 재화 적립 가이드"
        priority
        width={670}
        height={894}
        className="mt-[24px] h-auto w-full rounded-[16px]"
      />

      <section className="mt-[40px]">
        <SectionTitle>재화 적립하러 가기</SectionTitle>

        <div className="mt-[12px] grid grid-cols-3 gap-[8px]">
          {CURRENCY_GUIDES.map((guide) => (
            <button
              key={guide.id}
              type="button"
              onClick={() => {
                window.location.href = getVoteAppLink(
                  guide.id as VoteAppPlatform,
                );
              }}
              aria-label={`${guide.label} 앱 열기`}
              className="flex flex-col items-center justify-center gap-[2px] rounded-[16px] bg-secondary-900 px-[21px] py-[14px]"
            >
              <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center">
                <Image
                  src={guide.iconSrc}
                  alt=""
                  width={28}
                  height={28}
                  aria-hidden="true"
                  className="h-[40px] w-[40px] rounded-full object-contain"
                />
              </span>
              <span className="w-full truncate text-center text-body-14 font-medium text-secondary-100">
                {guide.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      <FloatingShareButton title="음악방송 재화 모으기 가이드" />
    </main>
  );
}
