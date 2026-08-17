'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface MusicNoticeLinkBtnProps {
  id?: string;
  iconSrc: string;
  title: string;
  description: string;
  href: string;
}

const MusicNoticeLinkBtn = ({
  iconSrc,
  title,
  description,
  href,
}: MusicNoticeLinkBtnProps) => {
  return (
    <>
      <div className="flex p-[16px] justify-between items-center rounded-[16px] bg-[#1B1B1B]">
        <div className="flex flex-row gap-[12px] items-center">
          <Image src={iconSrc} alt={'ICON_SVG'} width={40} height={40} />

          <div>
            <p className="text-body-15 font-bold">{title}</p>
            <span className="text-body-13 text-secondary-400">
              {description}
            </span>
          </div>
        </div>

        <Link href={href}>
          <Image
            src={'/icon/line/arrow-right_gray-24.svg'}
            alt="arrowIconGray"
            width={24}
            height={24}
          />
        </Link>
      </div>
    </>
  );
};

export default MusicNoticeLinkBtn;
