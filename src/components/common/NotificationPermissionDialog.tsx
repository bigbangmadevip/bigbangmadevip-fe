'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

type NotificationPermissionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEnable: () => void | Promise<void>;
  onLater: () => void | Promise<void>;
  enableDisabled?: boolean;
};

export default function NotificationPermissionDialog({
  open,
  onOpenChange,
  onEnable,
  onLater,
  enableDisabled = false,
}: NotificationPermissionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="box-border w-[calc(100vw-40px)] max-w-[335px] gap-0 rounded-[20px] border-none bg-secondary-900 px-[20px] pt-[28px] pb-[20px] shadow-[0_16px_48px_rgba(0,0,0,0.4)] sm:max-w-[335px]"
      >
        <div className="text-center">
          <DialogTitle className="text-title-17 font-bold text-secondary-1">
            알림 권한 안내
          </DialogTitle>
          <DialogDescription className="mt-[12px] whitespace-pre-line text-body-13 leading-[1.55] text-secondary-400">
            {
              '총공 시작, 투표 마감, 긴급 변경 소식을\n놓치지 않도록 알림을 받아보세요.'
            }
          </DialogDescription>
        </div>

        <div className="mt-[24px] flex items-center gap-[16px] px-[8px]">
          <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center">
            <Image
              src="/icon/line/alarm_white-32.svg"
              alt=""
              width={32}
              height={32}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <p className="text-body-14 font-bold text-secondary-100">
              알림 (선택)
            </p>
            <p className="mt-[4px] text-body-13 leading-[1.45] text-secondary-500">
              푸시 알림 및 총공 관련 알림 기능에 사용
            </p>
          </div>
        </div>

        <div className="mt-[28px] flex flex-col gap-[8px]">
          <button
            type="button"
            disabled={enableDisabled}
            onClick={onEnable}
            className="h-[48px] w-full rounded-[12px] bg-main text-body-14 font-bold text-secondary-950 disabled:cursor-not-allowed disabled:bg-secondary-800 disabled:text-secondary-600"
          >
            알림 켜기
          </button>
          <button
            type="button"
            onClick={onLater}
            className="h-[48px] w-full rounded-[12px] bg-secondary-400 text-body-14 font-bold text-secondary-700"
          >
            나중에 할게요
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
