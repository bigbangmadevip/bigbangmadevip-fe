'use client';

import { useRouter } from 'next/navigation';
import { AppDialog } from '@/components/common/AppDialog';

type LoginRequiredDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
};

export function LoginRequiredDialog({
  open,
  onOpenChange,
  title = '로그인이 필요해요.',
  description = '로그인하고 VIP들과 함께 응원해보세요!',
}: LoginRequiredDialogProps) {
  const router = useRouter();

  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      actions={[
        {
          label: '그만두기',
          variant: 'secondary',
          onClick: () => onOpenChange(false),
        },
        {
          label: '로그인하기',
          onClick: () => router.push('/login'),
        },
      ]}
    />
  );
}
