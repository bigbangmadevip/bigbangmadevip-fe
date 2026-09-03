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
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex p-[16px] justify-between items-center rounded-[16px] bg-[#1B1B1B]">
          <div className="flex flex-row gap-[8px] items-center">
            <Image src={iconSrc} alt={'ICON_SVG'} width={40} height={40} />

            <div>
              <p className="text-body-14 font-bold">{title}</p>
              <span className="text-body-13 text-secondary-400">
                {description}
              </span>
            </div>
          </div>

          <Image
            src={'/icon/line/arrow-right_gray-24.svg'}
            alt="arrowIconGray"
            width={24}
            height={24}
          />
        </div>
      </Link>
    </>
  );
};

export default MusicNoticeLinkBtn;
