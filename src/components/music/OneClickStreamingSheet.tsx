'use client';

import { getPlatformKoreanLabel } from '@/constants/platform';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import type { MusicOs, MusicStreamingPlatform } from '@/types/music';
import Image from 'next/image';

interface OneClickStreamingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  platform: MusicStreamingPlatform | null;
  os: MusicOs | null;
}

export function detectMusicOs(): MusicOs | null {
  if (typeof navigator === 'undefined') return null;

  const userAgent = navigator.userAgent;
  const isIPad =
    /iPad/i.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (/Android/i.test(userAgent)) return 'ANDROID';
  if (isIPad) return 'IPAD';
  if (/iPhone|iPod/i.test(userAgent)) return 'IPHONE';
  if (/Windows/i.test(userAgent)) return 'WINDOWS';
  if (/Macintosh|Mac OS X/i.test(userAgent)) return 'MAC';

  return null;
}

export default function OneClickStreamingSheet({
  open,
  onOpenChange,
  platform,
  os,
}: OneClickStreamingSheetProps) {
  const links =
    platform?.osGroups.find((group) => group.os === os)?.links ?? [];
  const platformLabel = platform ? getPlatformKoreanLabel(platform.name) : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        closeOnPointerDownOutside
        className="one-click-streaming-sheet py-[28px] px-[20px] inset-x-0 top-auto bottom-0 mx-auto grid max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-[430px] translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-t-[16px] rounded-b-none border-none bg-secondary-900 pb-[calc(32px+env(safe-area-inset-bottom))] shadow-none"
      >
        <header className="grid grid-cols-[44px_minmax(0,1fr)_44px] items-center">
          <span aria-hidden="true" />
          <DialogTitle className="truncate text-center text-title-17 font-bold text-secondary-1">
            {platformLabel} 원클릭 스트리밍
          </DialogTitle>
          <DialogClose
            aria-label="원클릭 스트리밍 닫기"
            className="flex h-[40px] w-[40px] pr-[8px] items-center justify-end text-secondary-1"
          >
            <Image
              src={'/icon/line/close-white_24.svg'}
              alt="CloseIcon"
              width={24}
              height={24}
            />
          </DialogClose>
        </header>

        {links.length > 0 ? (
          <ul className="mt-[24px] flex flex-col gap-[8px]">
            {links.map((link, index) => (
              <li key={`${link.url}-${index}`}>
                <a
                  href={link.url}
                  className="flex items-center justify-between rounded-[12px] border border-secondary-700 bg-secondary-800 pl-[16px] pr-[12px] py-[17px] text-body-15 text-secondary-1"
                >
                  <span>{`${index + 1}번 ${platformLabel} 원클릭 스트리밍`}</span>
                  <Image
                    src={'/icon/line/arrow-right_gray-24.svg'}
                    alt="RigntArrowIcon"
                    aria-hidden="true"
                    className="shrink-0 text-secondary-400"
                    width={24}
                    height={24}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-[24px] flex min-h-[120px] items-center justify-center rounded-[12px] border border-secondary-800 px-[20px] text-center text-body-13 text-secondary-400">
            현재 기기에서 사용할 수 있는 스트리밍 링크가 없어요.
          </div>
        )}

        <DialogDescription className="mt-[12px] text-body-13 font-medium text-accent-red">
          * 정상 반영을 위해 중복곡 허용 설정 후, 기존 재생목록을 삭제하고
          1번부터 순서대로 진행해주세요.
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
