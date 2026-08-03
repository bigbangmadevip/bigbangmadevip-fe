'use client';

import Image from 'next/image';

interface CheeringCardProps {
  title: string;
  iconSrc: string | null;
  iconAlt: string;
  completed: boolean;
  onParticipate: () => void;
}

export function CheeringCard({
  title,
  iconSrc,
  iconAlt,
  onParticipate,
}: CheeringCardProps) {
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

      <p className="mt-[4px] min-h-[36px] whitespace-pre-line text-body-13 font-normal text-secondary-1">
        {title}
      </p>

      <button
        type="button"
        className="mt-[6px] rounded-[16px] bg-main px-[10px] py-[4px] text-body-11 font-bold text-secondary-950"
        onClick={onParticipate}
      >
        참여하기
      </button>
    </article>
  );
}
