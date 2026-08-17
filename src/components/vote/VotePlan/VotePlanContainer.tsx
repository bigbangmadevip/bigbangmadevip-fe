import Image from 'next/image';
import votePng from '@/assets/voteplan.png';
import Link from 'next/link';

interface VotePlanContentBoxProps {
  id: string;
  caption: string;
  title: string;
  ctaText: string;
  ctaLink: string;
}

const PLAN_MOCK: VotePlanContentBoxProps[] = [
  {
    id: '0',
    caption: '놓치면 안되는',
    title: 'VIP 주간 투표 일정',
    ctaText: '이번 주 일정 보기',
    ctaLink: '/vote/plan/weekly',
  },
  {
    id: '1',
    caption: '투표를 위한 첫 걸음!',
    title: '음악방송 재화 모으기 가이드',
    ctaText: '가이드 보기',
    ctaLink: '/vote/plan/currency',
  },
];

const VotePlanContentBox = ({
  caption,
  title,
  ctaText,
  ctaLink,
}: VotePlanContentBoxProps) => {
  return (
    <div className="w-full pt-[32px] pb-[14px] px-[20px] bg-[rgba(0,149,253,1)] rounded-[16px]">
      <p className="mb-[2px] text-body-13 font-medium text-secondary-100">
        {caption}
      </p>
      <h3 className="mb-[8px] text-[20px] font-bold text-secondary-1">
        {title}
      </h3>
      <Image
        className="mx-auto"
        src={votePng}
        alt="votePng"
        width={172}
        height={172}
      />
      <Link
        href={ctaLink}
        className="mt-[16px] -mx-[4px] flex w-full items-center justify-center rounded-full border border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.12)] py-[12px] text-body-13 font-bold"
      >
        {ctaText}
      </Link>
    </div>
  );
};

const VotePlanContainer = () => {
  return (
    <div className="flex flex-col gap-[16px] mt-[24px]">
      {PLAN_MOCK.map((plan) => (
        <VotePlanContentBox key={plan.id} {...plan} />
      ))}
    </div>
  );
};

export default VotePlanContainer;
