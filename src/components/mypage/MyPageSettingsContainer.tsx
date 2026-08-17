'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppDialog } from '@/components/common/AppDialog';
import FullPageDialog from '@/components/common/FullPageDialog';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { AGREEMENTS, type AgreementKey } from '@/constants/agreement';
import {
  useLogoutMutation,
  useWithdrawAccountMutation,
} from '@/hooks/mutations/useAuthSessionMutation';
import WithdrawalGuideSheet from './WithdrawalGuideSheet';

type SettingsRowProps = {
  label: string;
  value?: string;
  onClick?: () => void;
};

function SettingsRow({ label, value, onClick }: SettingsRowProps) {
  if (!onClick) {
    return (
      <div className="flex py-[12px] items-center justify-between gap-[16px]">
        <span className="text-body-15 text-secondary-1">{label}</span>
        {value && (
          <span className="text-right text-body-13 text-secondary-400">
            {value}
          </span>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex py-[12px] w-full items-center justify-between gap-[16px] text-left"
    >
      <span className="text-body-15 text-secondary-1">{label}</span>

      <Image
        src={'/icon/line/arrow-right_gray-24.svg'}
        alt="CloseIcon"
        width={24}
        height={24}
      />
    </button>
  );
}

type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <section className={'border-b border-secondary-900 last:border-b-0'}>
      <h2 className="text-body-13 font-medium text-secondary-400">{title}</h2>
      <div className="my-[16px]">{children}</div>
    </section>
  );
}

export default function MyPageSettingsContainer() {
  const router = useRouter();
  const logoutMutation = useLogoutMutation();
  const withdrawAccountMutation = useWithdrawAccountMutation();
  const [activeAgreement, setActiveAgreement] = useState<AgreementKey | null>(
    null,
  );
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isWithdrawalSheetOpen, setIsWithdrawalSheetOpen] = useState(false);
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false);
  const activeAgreementContent = AGREEMENTS.find(
    ({ key }) => key === activeAgreement,
  );

  return (
    <>
      <main className="flex min-h-[calc(100dvh-env(safe-area-inset-top))] flex-col">
        <PageHeader
          leftAction={
            <HeaderIconButton
              label="뒤로가기"
              align="start"
              onClick={() => router.back()}
            >
              <Image
                src="/icon/line/arrow-left_white-28.svg"
                alt=""
                width={28}
                height={28}
                aria-hidden="true"
              />
            </HeaderIconButton>
          }
        />

        <div className="flex flex-1 flex-col mt-[24px] gap-[28px]">
          <SettingsSection title="사용자 설정">
            <SettingsRow
              label="로그인 정보"
              onClick={() => router.push('/mypage/settings/login')}
            />
            {/* <SettingsRow label="알림 설정" onClick={() => undefined} /> */}
          </SettingsSection>

          <SettingsSection title="고객 지원">
            <SettingsRow
              label="공지사항"
              onClick={() => router.push('/mypage/settings/notices')}
            />
            {/* <SettingsRow label="문의하기" onClick={() => undefined} /> */}
          </SettingsSection>

          <SettingsSection title="서비스 이용 안내">
            <SettingsRow
              label="개인정보처리방침"
              onClick={() => setActiveAgreement('privacy')}
            />
            <SettingsRow
              label="서비스 이용 약관"
              onClick={() => setActiveAgreement('terms')}
            />
            <SettingsRow label="버전 정보" value="v26.08.0 (26.08.19.20)" />
          </SettingsSection>

          <div className="mt-[72px] flex flex-col items-center">
            <button
              type="button"
              className="w-full text-body-13 py-[10px] font-medium text-secondary-300 underline-offset-4"
              onClick={() => setIsLogoutDialogOpen(true)}
            >
              로그아웃
            </button>
            <button
              type="button"
              className="text-body-13 py-[10px] font-medium text-secondary-700 underline-offset-4"
              onClick={() => setIsWithdrawalSheetOpen(true)}
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </main>

      <FullPageDialog
        open={activeAgreement !== null}
        onOpenChange={(open) => {
          if (!open) setActiveAgreement(null);
        }}
        title={activeAgreementContent?.detailTitle ?? ''}
      >
        <p className="whitespace-pre-line">
          {activeAgreementContent?.detailContent}
        </p>
      </FullPageDialog>

      <AppDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        title="로그아웃 할까요?"
        description={'다시 로그인하면\n응원 기록을 계속 확인할 수 있어요.'}
        actions={[
          {
            label: '돌아가기',
            variant: 'secondary',
            onClick: () => setIsLogoutDialogOpen(false),
          },
          {
            label: logoutMutation.isPending ? '로그아웃 중' : '로그아웃',
            disabled: logoutMutation.isPending,
            onClick: () => logoutMutation.mutate(),
          },
        ]}
      />

      <WithdrawalGuideSheet
        open={isWithdrawalSheetOpen}
        onOpenChange={setIsWithdrawalSheetOpen}
        onConfirm={() => {
          setIsWithdrawalSheetOpen(false);
          setIsWithdrawalDialogOpen(true);
        }}
      />

      <AppDialog
        open={isWithdrawalDialogOpen}
        onOpenChange={setIsWithdrawalDialogOpen}
        title="정말 회원탈퇴 할까요?"
        description="회원탈퇴 후 삭제된 정보는 복구할 수 없어요."
        actions={[
          {
            label: '돌아가기',
            variant: 'secondary',
            onClick: () => setIsWithdrawalDialogOpen(false),
          },
          {
            label: withdrawAccountMutation.isPending
              ? '탈퇴 처리 중'
              : '회원탈퇴',
            disabled: withdrawAccountMutation.isPending,
            onClick: () => withdrawAccountMutation.mutate(),
          },
        ]}
      />
    </>
  );
}
