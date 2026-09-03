'use client';

import Image from 'next/image';
import Link from 'next/link';
import ArrowRight from '@/assets/line/arrow-right.svg';
import { useState } from 'react';
import SnsLinkBottomSheet from './SnsLinkBottomSheet';

type PublicSns = 'Youtube' | 'Instagram' | 'X' | 'Tictok' | 'Facebook';

interface SNS_CONTENTS {
  sns: PublicSns;
  logoSrc: string;
  links: { label: string; src: string }[];
}

const SNS_LIST: SNS_CONTENTS[] = [
  {
    sns: 'Youtube',
    logoSrc: '/images/snslogo/youtube.png',
    links: [
      { label: '유튜브', src: 'https://www.youtube.com/@BIGBANG/videos' },
    ],
  },
  {
    sns: 'Instagram',
    logoSrc: '/images/snslogo/instagram.png',
    links: [
      {
        label: '빅뱅 인스타그램',
        src: 'https://www.instagram.com/bigbang_2xx6/',
      },
      {
        label: '지드래곤 인스타그램',
        src: 'https://www.instagram.com/xxxibgdrgn/',
      },
      {
        label: '태양 인스타그램',
        src: 'https://www.instagram.com/__youngbae__/',
      },
      {
        label: '대성 인스타그램',
        src: 'https://www.instagram.com/d_lable_official/',
      },
    ],
  },
  {
    sns: 'X',
    logoSrc: '/images/snslogo/x.png',
    links: [{ label: '엑스', src: 'https://x.com/YG_GlobalVIP' }],
  },
  {
    sns: 'Tictok',
    logoSrc: '/images/snslogo/tictok.png',
    links: [{ label: '틱톡', src: 'https://www.tiktok.com/@bigbang.official' }],
  },
  {
    sns: 'Facebook',
    logoSrc: '/images/snslogo/facebook.png',
    links: [{ label: '페이스북', src: 'https://www.facebook.com/BIGBANG/' }],
  },
];

const SnsLinkContainer = () => {
  const [selectedSns, setSelectedSns] = useState<SNS_CONTENTS | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const openBottomSheet = (snsItem: SNS_CONTENTS) => {
    setSelectedSns(snsItem);
    setIsBottomSheetOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-[8px]">
        {SNS_LIST.map((snsItem) => {
          const content = (
            <>
              <div className="flex items-center gap-[4px]">
                <Image
                  src={snsItem.logoSrc}
                  alt=""
                  width={32}
                  height={32}
                />
                <span className="text-body-14 font-medium text-secondary-1">
                  {snsItem.sns}
                </span>
              </div>
              <ArrowRight className="h-[24px] w-[24px] shrink-0 text-secondary-400" />
            </>
          );

          return snsItem.links.length === 1 ? (
            <Link
              key={snsItem.sns}
              href={snsItem.links[0].src}
              className="flex items-center justify-between rounded-[16px] bg-secondary-900 p-[16px] pr-[12px]"
            >
              {content}
            </Link>
          ) : (
            <button
              key={snsItem.sns}
              type="button"
              aria-haspopup="dialog"
              onClick={() => openBottomSheet(snsItem)}
              className="flex items-center justify-between rounded-[16px] bg-secondary-900 p-[16px] pr-[12px]"
            >
              {content}
            </button>
          );
        })}
      </div>

      <SnsLinkBottomSheet
        open={isBottomSheetOpen}
        onOpenChange={setIsBottomSheetOpen}
        snsName={selectedSns?.sns ?? ''}
        links={selectedSns?.links ?? []}
      />
    </>
  );
};

export default SnsLinkContainer;
