import Image from 'next/image';

type CommonErrorScreenProps = {
  message?: string;
};

export default function CommonErrorScreen({
  message = '페이지를 불러오는 중 오류가 발생했어요.\n잠시 후 다시 시도해주세요.',
}: CommonErrorScreenProps) {
  return (
    <main className="flex min-h-[calc(100dvh-env(safe-area-inset-top))] items-center justify-center bg-secondary-950 px-[20px] text-center">
      <div className="flex -translate-y-[12px] flex-col items-center gap-[8px]">
        <Image
          src="/icon/error-corn_gray.svg"
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
        />
        <p className="whitespace-pre-line text-body-12 font-normal text-secondary-500">
          {message}
        </p>
      </div>
    </main>
  );
}
