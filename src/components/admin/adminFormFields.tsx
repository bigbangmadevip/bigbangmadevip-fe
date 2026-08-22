'use client';

import { useEffect, useRef, useState } from 'react';

export const INPUT_CLASS =
  'mt-[7px] w-full rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-1 outline-none placeholder:text-secondary-600 focus:border-secondary-500';

export type ImageItem =
  | { id: string; kind: 'existing'; url: string }
  | { id: string; kind: 'new'; file: File; previewUrl: string };

export function Field({
  label,
  name,
  defaultValue,
  required = false,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  required?: boolean;
  type?: 'text' | 'number' | 'url' | 'datetime-local';
  placeholder?: string;
}) {
  return (
    <label className="block text-body-12 text-secondary-300">
      {label}
      {required && <span className="ml-[3px] text-accent-red">*</span>}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ''}
        placeholder={placeholder}
        className={INPUT_CLASS}
      />
    </label>
  );
}

export function ToggleSwitch({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-100">
      {label}
      <span className="relative inline-flex h-[24px] w-[42px] shrink-0">
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className="peer sr-only"
        />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-secondary-700 transition-colors peer-checked:bg-main" />
        <span className="pointer-events-none absolute top-1/2 left-[3px] h-[18px] w-[18px] -translate-y-1/2 rounded-full bg-secondary-1 transition-transform peer-checked:translate-x-[18px]" />
      </span>
    </label>
  );
}

export function PublishSetting({
  defaultActive = true,
}: {
  defaultActive?: boolean;
}) {
  return (
    <section className="mt-[8px]">
      <h2 className="text-title-17 font-bold text-secondary-1">게시 설정</h2>
      <p className="mt-[20px] text-body-12 text-secondary-300">게시 상태</p>
      <div className="mt-[8px] grid grid-cols-2 gap-[8px]">
        {[
          { label: '공개', value: 'true' },
          { label: '비공개', value: 'false' },
        ].map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name="active"
              value={option.value}
              defaultChecked={defaultActive === (option.value === 'true')}
              className="peer sr-only"
            />
            <span className="flex h-[52px] items-center justify-center rounded-[10px] border border-transparent bg-secondary-900 text-body-14 font-bold text-secondary-500 peer-checked:border-secondary-600 peer-checked:bg-secondary-800 peer-checked:text-secondary-1">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      <p className="mt-[8px] text-body-11 leading-[1.5] text-secondary-500">
        공개 시 사용자에게 즉시 노출되며, 비공개 시 관리자만 확인할 수 있습니다.
      </p>
    </section>
  );
}

export function DetailImageUpload({
  initialUrls,
  onItemsChange,
}: {
  initialUrls: string[];
  onItemsChange: (items: ImageItem[]) => void;
}) {
  const [items, setItems] = useState<ImageItem[]>(() =>
    initialUrls.map((url) => ({ id: url, kind: 'existing', url })),
  );
  const [error, setError] = useState('');
  const itemsRef = useRef(items);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  useEffect(() => {
    onItemsChange(items);
    return () => {
      itemsRef.current.forEach((item) => {
        if (item.kind === 'new') URL.revokeObjectURL(item.previewUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateItems = (next: ImageItem[]) => {
    setItems(next);
    onItemsChange(next);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-body-12 text-secondary-300">이미지 첨부 (선택)</p>
        <span className="text-caption-10 text-secondary-500">
          {items.length} / 3
        </span>
      </div>
      <div className="mt-[7px] grid grid-cols-3 gap-[8px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square overflow-hidden rounded-[10px] bg-secondary-900"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.kind === 'existing' ? item.url : item.previewUrl}
              alt=""
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              aria-label="이미지 삭제"
              onClick={() => {
                if (item.kind === 'new') URL.revokeObjectURL(item.previewUrl);
                updateItems(
                  items.filter((current) => current.id !== item.id),
                );
              }}
              className="absolute top-[4px] right-[4px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black/60 text-[12px] text-secondary-1"
            >
              ×
            </button>
          </div>
        ))}
        {items.length < 3 && (
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-[4px] rounded-[10px] border border-dashed border-secondary-700 bg-secondary-900 text-secondary-400">
            <span className="text-[22px] font-normal">＋</span>
            <span className="text-caption-10">이미지 선택</span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              multiple
              className="sr-only"
              onChange={(event) => {
                const selected = Array.from(event.target.files ?? []);
                const oversized = selected.some(
                  (file) => file.size > 10 * 1024 * 1024,
                );
                if (oversized) {
                  setError('이미지는 한 장당 10MB 이하여야 해요.');
                  event.target.value = '';
                  return;
                }
                const room = 3 - items.length;
                if (selected.length > room) {
                  setError('이미지는 최대 3장까지 첨부할 수 있어요.');
                  event.target.value = '';
                  return;
                }
                setError('');
                const newItems: ImageItem[] = selected.map((file) => ({
                  id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 8)}`,
                  kind: 'new',
                  file,
                  previewUrl: URL.createObjectURL(file),
                }));
                updateItems([...items, ...newItems]);
                event.target.value = '';
              }}
            />
          </label>
        )}
      </div>
      {error && (
        <p className="mt-[6px] text-body-11 text-accent-red">{error}</p>
      )}
      <p className="mt-[6px] text-caption-10 text-secondary-500">
        PNG, JPG, WEBP, GIF · 장당 최대 10MB
      </p>
    </div>
  );
}
