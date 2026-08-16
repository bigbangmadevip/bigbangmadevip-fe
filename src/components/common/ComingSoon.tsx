import Image from 'next/image';

type ComingSoonProps = {
  description?: string;
  className?: string;
};

export default function ComingSoon({
  description = '조금만 기다려주세요.\nVIP를 위한 새 공간을 열심히 준비하고 있어요.',
  className,
}: ComingSoonProps) {
  return (
    <div
      role="status"
      className={`pointer-events-none fixed inset-0 mx-auto flex w-full max-w-[430px] items-center justify-center px-[20px] text-center ${className ?? ''}`}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/icon/rocket-gray.svg"
          alt="ComingSoonIcon"
          width={40}
          height={40}
          aria-hidden="true"
        />
        <span className="mt-[16px] whitespace-pre-line text-body-13 font-medium text-secondary-500">
          {description}
        </span>
      </div>
    </div>
  );
}
