import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface UrgentNoticeBannerProps {
  title: string;
  link: string;
  className?: string;
}

const UrgentNoticeBanner = ({
  title,
  link,
  className,
}: UrgentNoticeBannerProps) => {
  return (
    <Link
      href={link}
      className={cn(
        'mt-[24px] mb-[24px] flex items-center justify-between rounded-full border border-[#ECE818] bg-[rgba(255,251,31,0.04)] px-[16px] py-[12px]',
        className,
      )}
    >
      <div className="flex gap-[4px]">
        <p className="font-bold text-body-13">🚨</p>
        <p className="font-bold text-body-13">{title}</p>
      </div>
      <Image
        src={'/icon/arrow-right_gray-24.svg'}
        alt="arrowIcon"
        width={18}
        height={18}
      />
    </Link>
  );
};

export default UrgentNoticeBanner;
