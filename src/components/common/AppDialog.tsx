'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

type AppDialogAction = {
  label: string;
  onClick: () => void | Promise<void>;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
};

type AppDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: React.ReactNode;
  actions: AppDialogAction[];
};

export function AppDialog({
  open,
  onOpenChange,
  title,
  description,
  actions,
}: AppDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 box-border w-[calc(100vw_-_64px)] max-w-[386px] rounded-[20px] border-none bg-secondary-800 pt-[28px] pb-[20px] px-[24px] sm:max-w-[386px]"
      >
        <div className="text-center">
          <DialogTitle className="text-title-17 font-bold text-secondary-1">
            {title}
          </DialogTitle>

          {description && (
            <DialogDescription className="mt-[8px] whitespace-pre-line text-body-15 text-secondary-300">
              {description}
            </DialogDescription>
          )}
        </div>

        <div
          className={`mt-[24px] grid gap-[8px] ${
            actions.length === 1 ? 'grid-cols-1' : 'grid-cols-2'
          }`}
        >
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              disabled={action.disabled}
              className={
                action.variant === 'secondary'
                  ? 'py-[12px] rounded-[12px] bg-secondary-400 font-bold text-secondary-700'
                  : 'py-[12px] rounded-[12px] bg-main font-bold text-[#161619]'
              }
              onClick={action.onClick}
            >
              {action.label}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
