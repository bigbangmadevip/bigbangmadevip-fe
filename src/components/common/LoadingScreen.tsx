interface LoadingScreenProps {
  label?: string;
}

export default function LoadingScreen({
  label = '로딩 중',
}: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45"
    >
      <div className="flex py-[24px] px-[32px] items-center justify-center gap-[12px] rounded-full border border-secondary-800 bg-secondary-950">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="h-[8px] w-[8px] animate-bounce rounded-full bg-main"
            style={{ animationDelay: `${dot * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
