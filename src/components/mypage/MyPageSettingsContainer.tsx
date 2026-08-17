'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FullPageDialog from '@/components/common/FullPageDialog';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';
import { AGREEMENTS, type AgreementKey } from '@/constants/agreement';

type SettingsRowProps = {
  label: string;
  value?: string;
  onClick?: () => void;
};

function SettingsRow({ label, value, onClick }: SettingsRowProps) {
  if (!onClick) {
    return (
      <div className="flex min-h-[72px] items-center justify-between gap-[16px]">
        <span className="text-body-15 text-secondary-1">{label}</span>
        {value && (
          <span className="text-right text-body-13 text-secondary-500">
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
      className="flex min-h-[72px] w-full items-center justify-between gap-[16px] text-left"
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
  withBorder?: boolean;
};

function SettingsSection({
  title,
  children,
  withBorder = true,
}: SettingsSectionProps) {
  return (
    <section
      className={
        withBorder ? 'border-b border-secondary-900 pb-[16px]' : 'pb-[16px]'
      }
    >
      <h2 className="pt-[16px] text-body-14 font-medium text-secondary-500">
        {title}
      </h2>
      <div className="mt-[4px]">{children}</div>
    </section>
  );
}

export default function MyPageSettingsContainer() {
  const router = useRouter();
  const [activeAgreement, setActiveAgreement] = useState<AgreementKey | null>(
    null,
  );
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
                src="/icon/line/arrow-left_white-24.svg"
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            </HeaderIconButton>
          }
        />

        <div className="flex flex-1 flex-col">
          <SettingsSection title="사용자 설정">
            <SettingsRow label="로그인 정보" onClick={() => undefined} />
            <SettingsRow label="알림 설정" onClick={() => undefined} />
          </SettingsSection>

          <SettingsSection title="고객 지원">
            <SettingsRow label="공지사항" onClick={() => undefined} />
            <SettingsRow label="문의하기" onClick={() => undefined} />
          </SettingsSection>

          <SettingsSection title="서비스 이용 안내" withBorder={false}>
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

          <div className="mt-auto flex flex-col items-center gap-[24px] px-[20px] pb-[40px] pt-[72px]">
            <button
              type="button"
              className="text-body-14 text-secondary-300 underline-offset-4"
            >
              로그아웃
            </button>
            <button
              type="button"
              className="text-body-14 text-secondary-800 underline-offset-4"
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
    </>
  );
}
