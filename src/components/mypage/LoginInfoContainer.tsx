'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import { useCurrentUserQuery } from '@/hooks/queries/useAuthQuery';

const PROVIDER_LABEL: Record<string, string> = {
  KAKAO: '카카오',
};

type LoginInfoRowProps = {
  provider: string;
  value: string;
};

function LoginInfoRow({ provider, value }: LoginInfoRowProps) {
  return (
    <div className="mt-[20px] flex items-center justify-between gap-[16px]">
      <div className="flex min-w-0 items-center gap-[8px]">
        <Image
          src="/icon/kakaotalk.svg"
          alt="카카오"
          width={32}
          height={32}
          className="shrink-0 rounded-[8px]"
        />
        <span className="text-body-15 text-secondary-1">
          {PROVIDER_LABEL[provider] ?? provider}
        </span>
      </div>
      <strong className="min-w-0 truncate text-body-15 font-bold text-secondary-1">
        {value}
      </strong>
    </div>
  );
}

export default function LoginInfoContainer() {
  const router = useRouter();
  const { data: currentUser, isPending, isError } = useCurrentUserQuery();

  if (isPending) {
    return <LoadingScreen label="로그인 정보 불러오는 중" />;
  }

  return (
    <main>
      <PageHeader
        title="로그인 정보"
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

      {isError || !currentUser ? (
        <div className="flex min-h-[120px] items-center justify-center text-body-13 text-secondary-500">
          로그인 정보를 불러오지 못했어요.
        </div>
      ) : (
        <div className="mt-[28px] flex flex-col gap-[40px]">
          <section>
            <h1 className="text-body-13 font-medium text-secondary-400">
              이름
            </h1>
            <LoginInfoRow
              provider={currentUser.provider}
              value={currentUser.name}
            />
          </section>

          <section>
            <h2 className="text-body-13 font-medium text-secondary-400">
              이메일
            </h2>
            <LoginInfoRow
              provider={currentUser.provider}
              value={currentUser.email}
            />
          </section>
        </div>
      )}
    </main>
  );
}
