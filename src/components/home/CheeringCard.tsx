'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';

interface CheeringCardProps {
  title: string;
  iconSrc: string | StaticImageData | null;
  iconAlt: string;
  completed: boolean;
  onParticipate: () => void;
}

export function CheeringCard({
  title,
  iconSrc,
  iconAlt,
  completed,
  onParticipate,
}: CheeringCardProps) {
  const ctaText = completed ? '완료' : '참여하기';
  return (
    <article className="flex min-w-0 flex-col items-center text-center">
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt={iconAlt}
          width={92}
          height={92}
          className="h-[92px] w-[92px] object-contain"
        />
      ) : (
        <div className="h-[92px] w-[92px]" aria-hidden="true" />
      )}

      <p className="mt-[4px] min-h-[36px] whitespace-pre-line text-body-14 font-normal text-secondary-1">
        {title}
      </p>

      <button
        type="button"
        className={`flex items-center gap-[2px] mt-[8px] rounded-[16px] px-[12px] py-[6px] text-body-13 ${
          completed
            ? 'bg-secondary-800 text-secondary-500 border border-[rgba(255,255,255,0.08)]'
            : 'bg-main text-secondary-950 text-body-11 font-bold'
        }`}
        onClick={onParticipate}
        disabled={completed}
      >
        {ctaText}
      </button>
    </article>
  );
}
