'use client';

import type { ReactNode } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';

type FullPageDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
};

export default function FullPageDialog({
  open,
  onOpenChange,
  title,
  children,
}: FullPageDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="full-page-dialog top-0 left-1/2 flex h-[100dvh] w-full max-w-[430px] translate-x-[-50%] translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-0 bg-secondary-950 p-0 shadow-none sm:max-w-[430px]"
      >
        <div className="h-[calc(64px+env(safe-area-inset-top))] shrink-0" />

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-[24px] bg-secondary-900">
          <header className="grid h-[80px] shrink-0 grid-cols-[44px_minmax(0,1fr)_44px] items-center px-[20px]">
            <span aria-hidden="true" />
            <DialogTitle className="truncate text-center text-title-17 font-bold text-secondary-1">
              {title}
            </DialogTitle>
            <DialogClose
              aria-label="상세 약관 닫기"
              className="flex h-[44px] w-[44px] items-center justify-end text-secondary-1"
            >
              <Image
                src={'/icon/line/close-white_28.svg'}
                alt="CloseIcon"
                width={28}
                height={28}
              />
            </DialogClose>
          </header>

          <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto px-[20px] pb-[calc(32px+env(safe-area-inset-bottom))] text-body-14 font-normal leading-[1.55] text-secondary-200">
            {children}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
