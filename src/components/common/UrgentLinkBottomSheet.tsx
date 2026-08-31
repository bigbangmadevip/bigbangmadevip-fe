'use client';

import Image from 'next/image';
import { ChevronRight, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { getVotePlatformIcon, getVotePlatformLabel } from '@/constants/vote-platform';
import type { VoteDetailLink } from '@/utils/vote-detail-links';

type UrgentLinkBottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  links: VoteDetailLink[];
};

export default function UrgentLinkBottomSheet({
  open,
  onOpenChange,
  title,
  links,
}: UrgentLinkBottomSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        closeOnPointerDownOutside
        className="urgent-link-sheet inset-x-0 top-auto bottom-0 mx-auto w-full max-w-[430px] translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-t-[20px] rounded-b-none border-none bg-secondary-900 px-5 pt-[24px] pb-[calc(32px+env(safe-area-inset-bottom))] shadow-none sm:max-w-[430px] max-h-[calc(100dvh-env(safe-area-inset-top))]"
      >
        <header className="grid grid-cols-[40px_minmax(0,1fr)_40px] items-center">
          <span aria-hidden="true" />
          <DialogTitle className="text-center text-title-17 font-bold text-secondary-1">
            {title}
          </DialogTitle>
          <DialogClose aria-label="투표 플랫폼 선택 닫기" className="flex h-10 w-10 items-center justify-center text-secondary-1">
            <X size={24} aria-hidden="true" />
          </DialogClose>
        </header>

        <DialogDescription className="mt-[24px] text-body-14 text-secondary-100">
          투표할 플랫폼을 선택해주세요.
        </DialogDescription>
        <ul className="mt-[16px] flex flex-col gap-[8px]">
          {links.map((link, index) => {
            // label은 플랫폼명 또는 "뮤빗에서 투표하기" 형태를 지원합니다.
            const platform = link.platformName || link.label.trim().replace(/에서\s*투표(?:하러\s*가기|하기)\s*$/, '').trim();
            const iconSrc = getVotePlatformIcon(platform);
            return (
              <li key={`${link.url}-${index}`}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onOpenChange(false)}
                  className="flex min-h-[56px] items-center gap-[10px] rounded-[12px] border border-secondary-700 bg-secondary-800 px-[16px] py-[14px] text-body-15 text-secondary-1"
                >
                  {iconSrc && <Image src={iconSrc} alt="" width={28} height={28} className="h-7 w-7 shrink-0 object-contain" />}
                  <span className="min-w-0 flex-1">
                    {iconSrc ? <><strong className="font-bold">{getVotePlatformLabel(platform)}</strong>에서 투표하기</> : (link.label || '투표하러 가기')}
                  </span>
                  <ChevronRight size={24} className="shrink-0 text-secondary-400" aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
