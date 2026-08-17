'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import { PageHeader } from '@/components/common/PageHeader';

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.ceil(bytes / 1024)}KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

export default function StreamingImageUploadContainer() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }

    event.target.value = '';
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <main className="flex min-h-[calc(100dvh-env(safe-area-inset-top))] flex-col px-[20px] pb-[calc(24px+env(safe-area-inset-bottom))]">
      <PageHeader
        title="스밍리스트 이미지 등록"
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

      <section className="mt-[28px]">
        <div className="flex items-end justify-between gap-[16px]">
          <div>
            <h1 className="text-title-17 font-bold text-secondary-1">
              스트리밍 리스트 이미지
            </h1>
            <p className="mt-[6px] text-body-12 text-secondary-400">
              이미지는 한 장만 등록할 수 있어요.
            </p>
          </div>
          <span className="shrink-0 text-body-11 text-secondary-500">
            {selectedFile ? '1 / 1' : '0 / 1'}
          </span>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="sr-only"
          onChange={handleFileChange}
        />

        {previewUrl && selectedFile ? (
          <div className="mt-[20px] overflow-hidden rounded-[16px] border border-secondary-800 bg-secondary-900">
            {/* 선택한 로컬 파일은 크기를 미리 알 수 없어 원본 비율로 표시합니다. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="선택한 스트리밍 리스트 미리보기"
              className="h-auto max-h-[55dvh] w-full object-contain"
            />

            <div className="flex items-center justify-between gap-[12px] border-t border-secondary-800 p-[16px]">
              <div className="min-w-0">
                <p className="truncate text-body-13 font-bold text-secondary-1">
                  {selectedFile.name}
                </p>
                <span className="mt-[2px] block text-body-11 text-secondary-400">
                  {formatFileSize(selectedFile.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemove}
                className="shrink-0 rounded-[8px] border border-secondary-700 px-[12px] py-[8px] text-body-12 text-secondary-200"
              >
                삭제
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-[20px] flex min-h-[280px] w-full flex-col items-center justify-center rounded-[16px] border border-dashed border-secondary-600 bg-secondary-900 px-[20px]"
          >
            <span className="text-[32px]" aria-hidden="true">
              🖼️
            </span>
            <span className="mt-[12px] text-body-14 font-bold text-secondary-1">
              이미지 선택하기
            </span>
            <span className="mt-[4px] text-body-11 text-secondary-400">
              PNG, JPG, WEBP
            </span>
          </button>
        )}

        {selectedFile && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-[12px] w-full rounded-[12px] border border-secondary-700 py-[13px] text-body-13 font-bold text-secondary-100"
          >
            다른 이미지 선택
          </button>
        )}
      </section>

      <button
        type="button"
        disabled={!selectedFile}
        className={`mt-auto w-full rounded-[12px] py-[16px] text-body-14 font-bold ${
          selectedFile
            ? 'bg-main text-secondary-950'
            : 'cursor-not-allowed bg-secondary-800 text-secondary-600'
        }`}
      >
        등록하기
      </button>
    </main>
  );
}
