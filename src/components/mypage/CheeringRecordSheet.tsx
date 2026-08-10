'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

interface CheeringRecordSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
  records: string[];
}

const WEEKDAYS = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

export default function CheeringRecordSheet({
  open,
  onOpenChange,
  date,
  records,
}: CheeringRecordSheetProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        closeOnPointerDownOutside
        className="cheering-record-sheet inset-x-0 top-auto bottom-0 mx-auto grid max-h-[calc(100dvh-env(safe-area-inset-top))] w-full max-w-[430px] translate-x-0 translate-y-0 gap-0 overflow-y-auto rounded-t-[24px] rounded-b-none border-none bg-secondary-900 px-[24px] pt-[28px] pb-[calc(40px+env(safe-area-inset-bottom))] shadow-none"
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="text-[22px] font-bold leading-[1.4] text-secondary-1">
            {date.getDate()}일 {WEEKDAYS[date.getDay()]}
          </DialogTitle>

          <DialogClose asChild>
            <button
              type="button"
              aria-label="응원 기록 닫기"
              className="flex h-[44px] w-[44px] items-center justify-end text-[34px] font-extralight leading-none text-secondary-1"
            >
              ×
            </button>
          </DialogClose>
        </div>

        <DialogDescription className="mt-[16px] text-body-15 text-secondary-500">
          {records.length}개의 응원을 완료했어요!
        </DialogDescription>

        {records.length > 0 ? (
          <ul className="mt-[28px] flex flex-col gap-[20px]">
            {records.map((record) => (
              <li
                key={record}
                className="flex items-center gap-[12px] text-body-15 text-secondary-100"
              >
                <span aria-hidden="true" className="text-[18px]">
                  👑
                </span>
                <p>
                  <strong className="font-bold">{record}</strong>
                  <span className="ml-[6px] font-normal">참여 완료</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex min-h-[160px] items-center justify-center text-body-13 text-secondary-500">
            완료한 응원 기록이 없어요.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
