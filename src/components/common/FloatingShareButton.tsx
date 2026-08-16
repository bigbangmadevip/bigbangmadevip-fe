'use client';

import { Share2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type ShareStatus = 'idle' | 'copied' | 'failed';

type FloatingShareButtonProps = {
  title: string;
  url?: string;
  className?: string;
};

function copyWithTextarea(value: string) {
  const textarea = document.createElement('textarea');

  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error('링크를 복사하지 못했습니다.');
  }
}

async function copyUrl(value: string) {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    return;
  }

  copyWithTextarea(value);
}

export default function FloatingShareButton({
  title,
  url,
  className,
}: FloatingShareButtonProps) {
  const [status, setStatus] = useState<ShareStatus>('idle');
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  const showStatus = (nextStatus: Exclude<ShareStatus, 'idle'>) => {
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);

    setStatus(nextStatus);
    statusTimerRef.current = setTimeout(() => setStatus('idle'), 2000);
  };

  const handleShare = async () => {
    const shareUrl = url ?? window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      await copyUrl(shareUrl);
      showStatus('copied');
    } catch {
      showStatus('failed');
    }
  };

  return (
    <div
      className={cn(
        'pointer-events-none fixed right-0 bottom-[calc(20px+env(safe-area-inset-bottom))] left-0 z-40 mx-auto flex w-full max-w-[430px] justify-end px-[20px]',
        className,
      )}
    >
      <div className="relative pointer-events-auto">
        {status !== 'idle' && (
          <p
            role="status"
            className="absolute right-0 bottom-[68px] w-max rounded-[8px] bg-secondary-800 px-[10px] py-[8px] text-body-12 text-secondary-100 shadow-lg"
          >
            {status === 'copied'
              ? '링크를 복사했어요.'
              : '링크를 복사하지 못했어요.'}
          </p>
        )}

        <button
          type="button"
          aria-label={`${title} 공유하기`}
          onClick={handleShare}
          className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-secondary-700 bg-secondary-950/90 text-secondary-1 shadow-[0_8px_24px_rgba(0,0,0,0.32)] backdrop-blur-sm"
        >
          <Share2 aria-hidden="true" size={24} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
