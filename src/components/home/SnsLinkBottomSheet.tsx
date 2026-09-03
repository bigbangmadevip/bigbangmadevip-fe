'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import ArrowRight from '@/assets/line/arrow-right.svg';

type SnsLink = {
  label: string;
  src: string;
};

type SnsLinkBottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  snsName: string;
  links: SnsLink[];
};

export default function SnsLinkBottomSheet({
  open,
  onOpenChange,
  snsName,
  links,
}: SnsLinkBottomSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        closeOnPointerDownOutside
        className="sns-link-sheet inset-x-0 top-auto bottom-0 mx-auto w-full max-w-[430px] translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-t-[16px] rounded-b-none border-none bg-secondary-900 px-[20px] pt-[20px] pb-[calc(32px+env(safe-area-inset-bottom))] shadow-none sm:max-w-[430px]"
      >
        <header className="grid grid-cols-[40px_minmax(0,1fr)_40px] items-center">
          <span aria-hidden="true" />
          <DialogTitle className="truncate text-center text-title-17 font-bold text-secondary-1">
            {snsName} 바로가기
          </DialogTitle>
          <DialogClose
            aria-label={`${snsName} 링크 선택 닫기`}
            className="flex h-10 w-10 items-center justify-center"
          >
            <Image
              src="/icon/line/close-white_24.svg"
              alt=""
              width={24}
              height={24}
              aria-hidden="true"
            />
          </DialogClose>
        </header>

        <DialogDescription className="sr-only">
          이동할 {snsName} 계정을 선택해주세요.
        </DialogDescription>

        <ul className="mt-[16px] flex flex-col gap-[8px]">
          {links.map((link) => (
            <li key={link.src}>
              <a
                href={link.src}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onOpenChange(false)}
                className="flex min-h-[64px] items-center justify-between rounded-[12px] border border-secondary-700 bg-secondary-800 py-[17px] pr-[12px] pl-[16px] text-body-14 text-secondary-1"
              >
                <span>{link.label}</span>
                <ArrowRight className="text-secondary-400 w-[24px] h-[24px]" />
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
