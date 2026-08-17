'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

type WithdrawalGuideSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function WithdrawalGuideSheet({
  open,
  onOpenChange,
  onConfirm,
}: WithdrawalGuideSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        closeOnPointerDownOutside
        className="withdrawal-guide-sheet inset-x-0 top-auto bottom-0 mx-auto grid max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-[430px] translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-t-[16px] rounded-b-none border-none bg-secondary-900 px-[20px] pt-[28px] pb-[calc(32px+env(safe-area-inset-bottom))] shadow-none"
      >
        <header className="relative pr-[44px]">
          <DialogTitle className="py-0 text-title-17 font-bold text-secondary-1">
            회원탈퇴 전 확인해주세요
          </DialogTitle>
          <DialogClose asChild>
            <button
              type="button"
              aria-label="회원탈퇴 안내 닫기"
              className="absolute right-0 top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-end"
            >
              <Image
                src="/icon/line/close-white_24.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            </button>
          </DialogClose>
        </header>

        <DialogDescription className="mt-[28px] whitespace-pre-line rounded-[12px] bg-secondary-800 p-[16px] text-body-13 text-secondary-200">
          {
            '탈퇴하면 지금까지의 모든 VIP 응원 기록과 설정 정보가\n삭제되며, 삭제된 정보는 다시 복구할 수 없어요.\n\n탈퇴 후에도 다시 가입할 수 있지만,\n이전 응원 기록은 이어지지 않아요.'
          }
        </DialogDescription>

        <button
          type="button"
          onClick={onConfirm}
          className="mt-[32px] py-[14px] w-full rounded-[12px] bg-accent-red text-body-14 font-bold text-secondary-1"
        >
          네, 탈퇴할게요
        </button>
        <DialogClose asChild>
          <button
            type="button"
            className="mt-[7px] py-[14px] w-full text-body-14 font-medium text-secondary-300"
          >
            더 써볼래요
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
