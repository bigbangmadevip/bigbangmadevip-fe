'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FullPageDialog from '@/components/common/FullPageDialog';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import { AGREEMENTS, type AgreementKey } from '@/constants/agreement';
import { useAgreeToTermsMutation } from '@/hooks/mutations/useAgreeToTermsMutation';
import Image from 'next/image';

function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full transition-colors ${
        checked
          ? 'bg-main text-secondary-950'
          : 'bg-secondary-800 text-secondary-700'
      }`}
    >
      <Image
        src={
          checked
            ? '/icon/line/check_black-20.svg'
            : '/icon/line/check_gray-20.svg'
        }
        alt="CheckIcon"
        width={20}
        height={20}
      />
    </span>
  );
}

export default function AgreementContainer() {
  const router = useRouter();
  const { mutate: agreeToTerms, isPending } = useAgreeToTermsMutation();
  const [activeAgreement, setActiveAgreement] = useState<AgreementKey | null>(
    null,
  );
  const [agreements, setAgreements] = useState<Record<AgreementKey, boolean>>({
    terms: false,
    privacy: false,
  });

  const isAllChecked = AGREEMENTS.every(({ key }) => agreements[key]);
  const activeAgreementContent = AGREEMENTS.find(
    ({ key }) => key === activeAgreement,
  );

  const toggleAll = () => {
    const nextChecked = !isAllChecked;

    setAgreements({
      terms: nextChecked,
      privacy: nextChecked,
    });
  };

  const toggleAgreement = (key: AgreementKey) => {
    setAgreements((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <>
      <main className="flex min-h-[100dvh] flex-col bg-secondary-950 px-[20px] pb-[calc(24px+env(safe-area-inset-bottom))] text-secondary-1">
        <PageHeader
          className="-mx-[8px] bg-secondary-950"
          rightAction={
            <HeaderIconButton
              label="동의 화면 닫기"
              align="end"
              disabled={isPending}
              onClick={() => router.replace('/login')}
            >
              <Image
                src={'/icon/line/close-white_28.svg'}
                alt="CloseIcon"
                width={28}
                height={28}
              />
            </HeaderIconButton>
          }
        />

        <section className="mt-[64px]">
          <h1 className="whitespace-pre-line text-[24px] font-bold">
            {'서비스 이용을 위해\n이용약관 동의가 필요해요.'}
          </h1>

          <button
            type="button"
            aria-pressed={isAllChecked}
            onClick={toggleAll}
            className="mt-[48px] flex w-full items-center gap-[12px] rounded-[12px] bg-secondary-900 px-[16px] py-[14px] text-body-15 font-bold"
          >
            <CheckCircle checked={isAllChecked} />
            <span>필수 약관 모두 동의하기</span>
          </button>

          <div className="mt-[8px] flex flex-col">
            {AGREEMENTS.map(({ key, label, detailTitle }) => (
              <div
                key={key}
                className="flex w-full items-center px-[16px] py-[6px]"
              >
                <button
                  type="button"
                  aria-pressed={agreements[key]}
                  onClick={() => toggleAgreement(key)}
                  className="flex min-w-0 flex-1 items-center gap-[12px] py-[8px] text-left"
                >
                  <CheckCircle checked={agreements[key]} />
                  <span className="min-w-0 flex-1 text-body-15 font-medium text-secondary-300">
                    {label}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label={`${detailTitle} 보기`}
                  onClick={() => setActiveAgreement(key)}
                  className="flex shrink-0 items-center justify-end"
                >
                  <Image
                    src={'/icon/line/arrow-right_darkgray-24.svg'}
                    alt="RightArrowIcon"
                    height={24}
                    width={24}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-auto pt-[40px]">
          <button
            type="button"
            disabled={!isAllChecked || isPending}
            onClick={() => agreeToTerms()}
            className={`w-full rounded-[12px] py-[18px] text-body-14 font-bold transition-colors ${
              isAllChecked && !isPending
                ? 'bg-main text-secondary-950'
                : 'cursor-not-allowed bg-secondary-800 text-secondary-600'
            }`}
          >
            다음
          </button>
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

      {isPending && <LoadingScreen label="약관 동의 처리 중" />}
    </>
  );
}
