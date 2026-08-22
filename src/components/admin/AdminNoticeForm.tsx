'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { uploadAdminImage } from '@/apis/admin-detail';
import { createAdminNotice, updateAdminNotice } from '@/apis/admin-notice';
import {
  DetailImageUpload,
  Field,
  INPUT_CLASS,
  PublishSetting,
  ToggleSwitch,
  type ImageItem,
} from '@/components/admin/adminFormFields';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ADMIN_NOTICE_QUERY_KEYS,
  useAdminNoticeQuery,
} from '@/hooks/queries/useAdminNoticeQuery';
import type {
  AdminNoticeLink,
  AdminNoticePayload,
} from '@/types/admin-notice';

type AdminNoticeFormProps = {
  menuType: 'music' | 'vote';
  noticeId?: string;
};

type LinkRow = { id: string; label: string; url: string };

function LinkListFields({
  initialLinks,
  onLinksChange,
}: {
  initialLinks: AdminNoticeLink[];
  onLinksChange: (links: AdminNoticeLink[]) => void;
}) {
  const [items, setItems] = useState<LinkRow[]>(() =>
    initialLinks.map((link, index) => ({ id: `initial-${index}`, ...link })),
  );

  const update = (next: LinkRow[]) => {
    setItems(next);
    onLinksChange(
      next
        .map(({ label, url }) => ({ label: label.trim(), url: url.trim() }))
        .filter((link) => link.label && link.url),
    );
  };

  useEffect(() => {
    onLinksChange(
      items
        .map(({ label, url }) => ({ label: label.trim(), url: url.trim() }))
        .filter((link) => link.label && link.url),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p className="text-body-12 text-secondary-300">관련 링크 (선택)</p>
      <div className="mt-[7px] flex flex-col gap-[8px]">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-[8px]">
            <div className="grid min-w-0 flex-1 grid-cols-2 gap-[8px]">
              <input
                type="text"
                value={item.label}
                onChange={(event) =>
                  update(
                    items.map((current) =>
                      current.id === item.id
                        ? { ...current, label: event.target.value }
                        : current,
                    ),
                  )
                }
                placeholder="링크 이름"
                className="w-full rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-1 outline-none placeholder:text-secondary-600 focus:border-secondary-500"
              />
              <input
                type="url"
                value={item.url}
                onChange={(event) =>
                  update(
                    items.map((current) =>
                      current.id === item.id
                        ? { ...current, url: event.target.value }
                        : current,
                    ),
                  )
                }
                placeholder="https://"
                className="w-full rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-1 outline-none placeholder:text-secondary-600 focus:border-secondary-500"
              />
            </div>
            <button
              type="button"
              aria-label={`링크 ${index + 1} 삭제`}
              onClick={() =>
                update(items.filter((current) => current.id !== item.id))
              }
              className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] border border-secondary-800 text-[20px] text-secondary-400"
            >
              −
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() =>
          update([
            ...items,
            {
              id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
              label: '',
              url: '',
            },
          ])
        }
        className="mt-[8px] flex w-full items-center justify-center rounded-[10px] border border-secondary-800 py-[11px] text-body-13 font-bold text-secondary-300"
      >
        + 링크 추가
      </button>
    </div>
  );
}

function PinnedSetting({ pinned }: { pinned?: boolean }) {
  const [enabled, setEnabled] = useState(pinned ?? false);

  return (
    <ToggleSwitch
      label="상단 고정"
      name="pinned"
      checked={enabled}
      onChange={setEnabled}
    />
  );
}

export default function AdminNoticeForm({
  menuType,
  noticeId,
}: AdminNoticeFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const imageItemsRef = useRef<ImageItem[]>([]);
  const linksRef = useRef<AdminNoticeLink[]>([]);
  const [submitError, setSubmitError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const isEdit = Boolean(noticeId);
  const basePath = menuType === 'music' ? '/musicadmin' : '/voteadmin';
  const label = menuType === 'music' ? '음총' : '투총';

  const noticeQuery = useAdminNoticeQuery(menuType, noticeId ?? '', isEdit);

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const imageItems = imageItemsRef.current;
      const newImageItems = imageItems.filter(
        (item): item is Extract<ImageItem, { kind: 'new' }> =>
          item.kind === 'new',
      );
      const uploadedUrls =
        newImageItems.length > 0
          ? await Promise.all(
              newImageItems.map((item) => uploadAdminImage(item.file)),
            )
          : [];
      let uploadIndex = 0;
      const imageUrls = imageItems.map((item) =>
        item.kind === 'existing' ? item.url : uploadedUrls[uploadIndex++],
      );

      const payload: AdminNoticePayload = {
        title: String(formData.get('title') ?? '').trim(),
        content: String(formData.get('content') ?? '').trim(),
        imageUrls,
        links: linksRef.current,
        pinned: formData.get('pinned') === 'on',
        active:
          formData.get('active') === 'on' ||
          formData.get('active') === 'true',
      };

      return noticeId
        ? updateAdminNotice(menuType, noticeId, payload)
        : createAdminNotice(menuType, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ADMIN_NOTICE_QUERY_KEYS.all(menuType),
      });
      router.replace(`${basePath}/notices`);
    },
    onError: () =>
      setSubmitError('저장하지 못했어요. 입력값과 관리자 권한을 확인해주세요.'),
  });

  if (isEdit && noticeQuery.isPending)
    return <LoadingScreen label="공지 불러오는 중" />;
  if (isEdit && noticeQuery.isError) {
    return (
      <main className="flex min-h-dvh items-center justify-center text-body-13 text-accent-red">
        공지를 불러오지 못했어요.
      </main>
    );
  }

  const initial = noticeQuery.data;

  return (
    <main className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-5 pb-[calc(32px+env(safe-area-inset-bottom))]">
      <PageHeader
        title={`${label} 공지 ${isEdit ? '수정' : '등록'}`}
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
            />
          </HeaderIconButton>
        }
      />

      <form
        ref={(form) => {
          formRef.current = form;
          if (form) {
            queueMicrotask(() => setIsFormValid(form.checkValidity()));
          }
        }}
        key={initial?.id ?? 'new'}
        className="mt-[20px] flex flex-col gap-[16px]"
        onInput={(event) => setIsFormValid(event.currentTarget.checkValidity())}
        onChange={() => {
          queueMicrotask(() => {
            setIsFormValid(formRef.current?.checkValidity() ?? false);
          });
        }}
        onClick={() => {
          queueMicrotask(() => {
            setIsFormValid(formRef.current?.checkValidity() ?? false);
          });
        }}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitError('');
          mutation.mutate(new FormData(event.currentTarget));
        }}
      >
        <Field
          label="제목"
          name="title"
          required
          defaultValue={initial?.title}
        />

        <label className="block text-body-12 text-secondary-300">
          컨텐츠<span className="ml-[3px] text-accent-red">*</span>
          <textarea
            name="content"
            rows={8}
            required
            defaultValue={initial?.content ?? ''}
            placeholder="공지 내용을 입력해주세요"
            className={`${INPUT_CLASS} resize-y`}
          />
        </label>

        <LinkListFields
          initialLinks={initial?.links ?? []}
          onLinksChange={(links) => {
            linksRef.current = links;
          }}
        />

        <DetailImageUpload
          initialUrls={initial?.imageUrls ?? []}
          onItemsChange={(items) => {
            imageItemsRef.current = items;
          }}
        />

        <PinnedSetting pinned={initial?.pinned} />

        <PublishSetting defaultActive={initial?.active ?? true} />

        {submitError && (
          <p role="alert" className="text-body-12 text-accent-red">
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={mutation.isPending || !isFormValid}
          className="mt-[8px] w-full rounded-[12px] bg-main py-[16px] text-body-14 font-bold text-secondary-950 disabled:cursor-not-allowed disabled:bg-secondary-800 disabled:text-secondary-600"
        >
          {mutation.isPending ? '저장 중...' : isEdit ? '수정하기' : '등록하기'}
        </button>
      </form>
    </main>
  );
}
