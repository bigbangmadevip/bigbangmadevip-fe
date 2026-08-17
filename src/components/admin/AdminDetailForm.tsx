'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import {
  createAdminMusicDetail,
  createAdminVoteDetail,
  uploadAdminImage,
  updateAdminMusicDetail,
  updateAdminVoteDetail,
} from '@/apis/admin-detail';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import {
  ADMIN_DETAIL_QUERY_KEYS,
  useAdminMusicDetailQuery,
  useAdminVoteDetailQuery,
} from '@/hooks/queries/useAdminDetailQuery';
import type {
  AdminMusicDetail,
  AdminMusicDetailPayload,
  AdminVoteDetail,
  AdminVoteDetailPayload,
} from '@/types/admin-detail';

type AdminDetailFormProps = {
  adminType: 'music' | 'vote';
  detailId?: string;
};

type InitialDetail = AdminMusicDetail | AdminVoteDetail | undefined;

const INPUT_CLASS =
  'mt-[7px] w-full rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-1 outline-none placeholder:text-secondary-600 focus:border-secondary-500';

function nullableString(value: FormDataEntryValue | null) {
  const result = String(value ?? '').trim();
  return result.length > 0 ? result : null;
}

function numberOrNull(value: FormDataEntryValue | null) {
  const result = String(value ?? '').trim();
  return result.length > 0 ? Number(result) : null;
}

function numberList(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map(Number)
    .filter((item) => Number.isFinite(item));
}

function stringList(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function formDataStringList(formData: FormData, name: string) {
  return formData
    .getAll(name)
    .flatMap((value) => stringList(value))
    .filter(Boolean);
}

function dateTimeOrNull(value: FormDataEntryValue | null) {
  const result = String(value ?? '').trim();
  if (!result) return null;
  return result.length === 16 ? `${result}:00` : result;
}

function toDateTimeInput(value?: string | null) {
  return value ? value.slice(0, 16) : '';
}

function combineDateAndTime(
  dateValue: FormDataEntryValue | null,
  timeValue: FormDataEntryValue | null,
) {
  const date = String(dateValue ?? '').trim();
  const time = String(timeValue ?? '').trim();
  return date && time ? `${date}T${time}:00` : null;
}

function Field({
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
      {label}{required && <span className="ml-[3px] text-accent-red">*</span>}
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

function TextAreaField({
  label,
  name,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string | string[] | null;
  placeholder?: string;
}) {
  return (
    <label className="block text-body-12 text-secondary-300">
      {label}
      <textarea
        name={name}
        rows={4}
        defaultValue={Array.isArray(defaultValue) ? defaultValue.join('\n') : defaultValue ?? ''}
        placeholder={placeholder}
        className={`${INPUT_CLASS} resize-y`}
      />
    </label>
  );
}

function CheckboxField({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center justify-between rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-100">
      {label}
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-[20px] w-[20px] accent-[#FFFB1F]" />
    </label>
  );
}

const MUSIC_PLATFORMS = [
  { id: 1, label: '멜론' },
  { id: 2, label: '지니' },
  { id: 3, label: '벅스' },
  { id: 4, label: '플로' },
  { id: 5, label: '바이브' },
];

function SelectField({
  label,
  name,
  defaultValue,
  options,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  options: { value: string | number; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block text-body-12 text-secondary-300">
      {label}
      {required && <span className="ml-[3px] text-accent-red">*</span>}
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ''}
        className={INPUT_CLASS}
      >
        <option value="" disabled>
          선택해주세요
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function MusicImageUpload({
  existingUrls,
  files,
  onFilesChange,
}: {
  existingUrls: string[];
  files: File[];
  onFilesChange: (files: File[]) => void;
}) {
  const [error, setError] = useState('');

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-body-12 text-secondary-300">이미지 첨부</p>
        <span className="text-caption-10 text-secondary-500">
          {files.length} / 3
        </span>
      </div>
      <label className="mt-[7px] flex min-h-[92px] cursor-pointer items-center justify-center rounded-[10px] border border-dashed border-secondary-700 bg-secondary-900 text-body-13 font-bold text-secondary-200">
        이미지 선택
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
            if (selected.length > 3) {
              setError('이미지는 최대 3장까지 첨부할 수 있어요.');
              event.target.value = '';
              return;
            }
            setError('');
              onFilesChange(selected);
            event.target.value = '';
          }}
        />
      </label>
      {files.length > 0 && (
        <ul className="mt-[8px] flex flex-col gap-[6px]">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.lastModified}`}
              className="flex items-center justify-between gap-[8px] rounded-[8px] bg-secondary-900 px-[12px] py-[9px]"
            >
              <span className="min-w-0 truncate text-body-12 text-secondary-200">
                {file.name}
              </span>
              <button
                type="button"
                onClick={() =>
                  onFilesChange(
                    files.filter((_, fileIndex) => fileIndex !== index),
                  )
                }
                className="shrink-0 text-body-11 text-secondary-500"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
      {existingUrls.length > 0 && (
        <p className="mt-[8px] text-caption-10 text-secondary-500">
          기존 등록 이미지 {existingUrls.length}장
        </p>
      )}
      {error && <p className="mt-[6px] text-body-11 text-accent-red">{error}</p>}
      <textarea
        name="imageUrls"
        defaultValue={existingUrls.join('\n')}
        className="hidden"
        readOnly
      />
      <p className="mt-[6px] text-caption-10 text-secondary-500">
        PNG, JPG, WEBP, GIF · 장당 최대 10MB
      </p>
    </div>
  );
}

function MusicUrgentSetting({ initial }: { initial?: AdminMusicDetail }) {
  const [enabled, setEnabled] = useState(initial?.menuUrgent ?? false);

  return (
    <div className="flex flex-col gap-[10px]">
      <label className="flex items-center justify-between rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-100">
        긴급 총공으로 노출
        <input
          name="menuUrgent"
          type="checkbox"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
          className="h-[20px] w-[20px] accent-[#FFFB1F]"
        />
      </label>
      {enabled && (
        <Field
          label="긴급 공지 제목"
          name="urgentContent"
          required
          defaultValue={initial?.urgentContent}
        />
      )}
    </div>
  );
}

function MusicReservationSetting({ initial }: { initial?: AdminMusicDetail }) {
  const [enabled, setEnabled] = useState(Boolean(initial?.scheduledAt));

  return (
    <div className="flex flex-col gap-[10px]">
      <label className="flex items-center justify-between rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-100">
        예약 게시
        <input
          type="checkbox"
          checked={enabled}
          onChange={(event) => setEnabled(event.target.checked)}
          className="h-[20px] w-[20px] accent-[#FFFB1F]"
        />
      </label>
      {enabled && (
        <fieldset>
          <legend className="text-body-12 text-secondary-300">
            예약 시간<span className="ml-[3px] text-accent-red">*</span>
          </legend>
          <div className="mt-[7px] grid grid-cols-[minmax(0,1fr)_120px] gap-[8px]">
            <label>
              <span className="sr-only">예약 날짜</span>
              <input
                name="scheduledDate"
                type="date"
                required
                defaultValue={initial?.scheduledAt?.slice(0, 10) ?? ''}
                className="h-[48px] w-full min-w-0 rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none focus:border-secondary-500 [color-scheme:dark]"
              />
            </label>
            <label>
              <span className="sr-only">예약 시각</span>
              <input
                name="scheduledTime"
                type="time"
                required
                step="60"
                defaultValue={initial?.scheduledAt?.slice(11, 16) ?? ''}
                className="h-[48px] w-full min-w-0 rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none focus:border-secondary-500 [color-scheme:dark]"
              />
            </label>
          </div>
        </fieldset>
      )}
    </div>
  );
}

function MusicChecklistFields({ initialItems }: { initialItems: string[] }) {
  const [items, setItems] = useState(() =>
    (initialItems.length > 0 ? initialItems : ['']).slice(0, 5).map((value, index) => ({
      id: index + 1,
      value,
    })),
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-body-12 text-secondary-300">체크 사항</p>
        <span className="text-caption-10 text-secondary-500">
          {items.length} / 5
        </span>
      </div>
      <div className="mt-[7px] flex flex-col gap-[8px]">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-[8px]">
            <input
              name="checklist"
              type="text"
              defaultValue={item.value}
              placeholder={`체크 사항 ${index + 1}`}
              className="w-full rounded-[10px] border border-secondary-800 bg-secondary-900 px-[13px] py-[12px] text-body-13 text-secondary-1 outline-none placeholder:text-secondary-600 focus:border-secondary-500"
            />
            {items.length > 1 && (
              <button
                type="button"
                aria-label={`체크 사항 ${index + 1} 삭제`}
                onClick={() =>
                  setItems((current) =>
                    current.filter((currentItem) => currentItem.id !== item.id),
                  )
                }
                className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] border border-secondary-800 text-[20px] text-secondary-400"
              >
                −
              </button>
            )}
          </div>
        ))}
      </div>
      {items.length < 5 && (
        <button
          type="button"
          onClick={() =>
            setItems((current) => [
              ...current,
              {
                id: Math.max(0, ...current.map((item) => item.id)) + 1,
                value: '',
              },
            ])
          }
          className="mt-[8px] flex w-full items-center justify-center rounded-[10px] border border-secondary-800 py-[11px] text-body-13 font-bold text-secondary-300"
        >
          + 체크 사항 추가
        </button>
      )}
    </div>
  );
}

function PublishSetting({ defaultActive = true }: { defaultActive?: boolean }) {
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
        공개 시 사용자에게 즉시 노출되며, 비공개 시 관리자만 확인할 수
        있습니다.
      </p>
    </section>
  );
}

export default function AdminDetailForm({ adminType, detailId }: AdminDetailFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [submitError, setSubmitError] = useState('');
  const [musicImageFiles, setMusicImageFiles] = useState<File[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const isEdit = Boolean(detailId);
  const musicQuery = useAdminMusicDetailQuery(detailId ?? '', adminType === 'music' && isEdit);
  const voteQuery = useAdminVoteDetailQuery(detailId ?? '', adminType === 'vote' && isEdit);
  const detailQuery = adminType === 'music' ? musicQuery : voteQuery;
  const basePath = adminType === 'music' ? '/musicadmin' : '/voteadmin';
  const label = adminType === 'music' ? '음총' : '투총';

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const existingImageUrls = stringList(formData.get('imageUrls'));
      const imageUrls =
        adminType === 'music' && musicImageFiles.length > 0
          ? await Promise.all(musicImageFiles.map(uploadAdminImage))
          : existingImageUrls;

      const common = {
        category: String(formData.get('category') ?? '').trim(),
        title: String(formData.get('title') ?? '').trim(),
        platformIds: numberList(formData.get('platformIds')),
        platformUrl: nullableString(formData.get('platformUrl')),
        checklist: formDataStringList(formData, 'checklist'),
        imageUrls,
        guideIds: numberList(formData.get('guideIds')),
        cheeringItemId: numberOrNull(formData.get('cheeringItemId')),
        menuUrgent: formData.get('menuUrgent') === 'on',
        urgentContent: nullableString(formData.get('urgentContent')),
        todayExposed: formData.get('todayExposed') === 'on',
        active:
          formData.get('active') === 'on' ||
          formData.get('active') === 'true',
        scheduledAt:
          adminType === 'music'
            ? combineDateAndTime(
                formData.get('scheduledDate'),
                formData.get('scheduledTime'),
              )
            : dateTimeOrNull(formData.get('scheduledAt')),
        sortOrder: Number(formData.get('sortOrder') ?? 0),
      };

      if (adminType === 'music') {
        const payload: AdminMusicDetailPayload = {
          ...common,
          songName: nullableString(formData.get('songName')),
          eventAt: combineDateAndTime(
            formData.get('eventDate'),
            formData.get('eventTime'),
          ),
          description: nullableString(formData.get('description')),
        };
        return detailId
          ? updateAdminMusicDetail(detailId, payload)
          : createAdminMusicDetail(payload);
      }

      const payload: AdminVoteDetailPayload = {
        ...common,
        musicShowId: numberOrNull(formData.get('musicShowId')),
        rewardDescription: nullableString(formData.get('rewardDescription')),
        eventStartAt: dateTimeOrNull(formData.get('eventStartAt')),
        eventEndAt: dateTimeOrNull(formData.get('eventEndAt')),
        ctaButtonLabel: nullableString(formData.get('ctaButtonLabel')),
        pushEnabled: formData.get('pushEnabled') === 'on',
        pushSendAt: dateTimeOrNull(formData.get('pushSendAt')),
        pushTitle: nullableString(formData.get('pushTitle')),
        pushBody: nullableString(formData.get('pushBody')),
      };
      return detailId
        ? updateAdminVoteDetail(detailId, payload)
        : createAdminVoteDetail(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: adminType === 'music' ? ADMIN_DETAIL_QUERY_KEYS.music() : ADMIN_DETAIL_QUERY_KEYS.vote(),
      });
      router.replace(`${basePath}/details`);
    },
    onError: () => setSubmitError('저장하지 못했어요. 입력값과 관리자 권한을 확인해주세요.'),
  });

  if (isEdit && detailQuery.isPending) return <LoadingScreen label="상세 불러오는 중" />;
  if (isEdit && detailQuery.isError) {
    return <main className="flex min-h-dvh items-center justify-center text-body-13 text-accent-red">상세를 불러오지 못했어요.</main>;
  }

  const initial = detailQuery.data as InitialDetail;
  const musicInitial = adminType === 'music' ? (initial as AdminMusicDetail | undefined) : undefined;
  const voteInitial = adminType === 'vote' ? (initial as AdminVoteDetail | undefined) : undefined;

  return (
    <main className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-5 pb-[calc(32px+env(safe-area-inset-bottom))]">
      <PageHeader
        title={`${label} 총공 ${isEdit ? '수정' : '등록'}`}
        leftAction={
          <HeaderIconButton label="뒤로가기" align="start" onClick={() => router.back()}>
            <Image src="/icon/line/arrow-left_white-28.svg" alt="" width={28} height={28} />
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
        onInput={(event) =>
          setIsFormValid(event.currentTarget.checkValidity())
        }
        onChange={() => {
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
        {adminType === 'music' ? (
          <>
            <SelectField
              label="카테고리"
              name="category"
              required
              defaultValue={musicInitial?.category}
              options={[
                { value: 'DOWNLOAD', label: '다운로드' },
                { value: 'STREAMING', label: '스트리밍' },
                { value: 'ETC', label: '기타' },
              ]}
            />
            <SelectField
              label="총공 플랫폼"
              name="platformIds"
              required
              defaultValue={musicInitial?.platformIds[0]}
              options={MUSIC_PLATFORMS.map((platform) => ({
                value: platform.id,
                label: platform.label,
              }))}
            />
            <Field
              label="제목"
              name="title"
              required
              defaultValue={musicInitial?.title}
            />
            <Field
              label="곡명"
              name="songName"
              required
              defaultValue={musicInitial?.songName}
            />
            <fieldset>
              <legend className="text-body-12 text-secondary-300">
                총공 시간<span className="ml-[3px] text-accent-red">*</span>
              </legend>
              <div className="mt-[7px] grid grid-cols-[minmax(0,1fr)_120px] gap-[8px]">
                <label>
                  <span className="sr-only">총공 날짜</span>
                  <input
                    name="eventDate"
                    type="date"
                    required
                    defaultValue={musicInitial?.eventAt?.slice(0, 10) ?? ''}
                    className="h-[48px] w-full min-w-0 rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none focus:border-secondary-500 [color-scheme:dark]"
                  />
                </label>
                <label>
                  <span className="sr-only">총공 시각</span>
                  <input
                    name="eventTime"
                    type="time"
                    required
                    step="60"
                    defaultValue={musicInitial?.eventAt?.slice(11, 16) ?? ''}
                    className="h-[48px] w-full min-w-0 rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none focus:border-secondary-500 [color-scheme:dark]"
                  />
                </label>
              </div>
              <p className="mt-[6px] text-caption-10 text-secondary-500">
                날짜와 시작 시간을 각각 선택해주세요.
              </p>
            </fieldset>
          </>
        ) : (
          <>
            <Field
              label="카테고리"
              name="category"
              required
              defaultValue={voteInitial?.category}
              placeholder="MUSIC_SHOW"
            />
            <Field
              label="제목"
              name="title"
              required
              defaultValue={voteInitial?.title}
            />
            <Field label="음악방송 ID" name="musicShowId" type="number" defaultValue={voteInitial?.musicShowId} />
            <Field label="투표 시작" name="eventStartAt" type="datetime-local" defaultValue={toDateTimeInput(voteInitial?.eventStartAt)} />
            <Field label="투표 마감" name="eventEndAt" type="datetime-local" defaultValue={toDateTimeInput(voteInitial?.eventEndAt)} />
            <TextAreaField label="보상 설명" name="rewardDescription" defaultValue={voteInitial?.rewardDescription} />
            <Field label="CTA 버튼명" name="ctaButtonLabel" defaultValue={voteInitial?.ctaButtonLabel} placeholder="투표하러 가기" />
          </>
        )}

        {adminType === 'music' ? (
          <MusicChecklistFields initialItems={musicInitial?.checklist ?? []} />
        ) : (
          <TextAreaField
            label="체크 사항 (한 줄에 하나)"
            name="checklist"
            defaultValue={initial?.checklist}
          />
        )}

        {adminType === 'music' ? (
          <>
            <MusicImageUpload
              existingUrls={musicInitial?.imageUrls ?? []}
              files={musicImageFiles}
              onFilesChange={setMusicImageFiles}
            />
            <MusicUrgentSetting initial={musicInitial} />
          </>
        ) : (
          <>
            <Field label="플랫폼 ID" name="platformIds" defaultValue={initial?.platformIds.join(', ')} placeholder="1, 2, 3" />
            <Field label="플랫폼 URL" name="platformUrl" type="url" defaultValue={initial?.platformUrl} />
            <TextAreaField label="이미지 URL (한 줄에 하나)" name="imageUrls" defaultValue={initial?.imageUrls} />
            <Field label="가이드 ID" name="guideIds" defaultValue={initial?.guideIds.join(', ')} placeholder="10, 11" />
            <Field label="응원 아이템 ID" name="cheeringItemId" type="number" defaultValue={initial?.cheeringItemId} />
            <TextAreaField label="긴급 공지 문구" name="urgentContent" defaultValue={initial?.urgentContent} />
          </>
        )}

        {adminType === 'music' ? (
          <MusicReservationSetting initial={musicInitial} />
        ) : (
          <Field
            label="예약 게시 시간"
            name="scheduledAt"
            type="datetime-local"
            defaultValue={toDateTimeInput(initial?.scheduledAt)}
          />
        )}
        {adminType === 'music' ? (
          <input
            type="hidden"
            name="sortOrder"
            value={musicInitial?.sortOrder ?? 0}
          />
        ) : (
          <Field
            label="정렬 순서"
            name="sortOrder"
            type="number"
            defaultValue={initial?.sortOrder ?? 0}
          />
        )}

        {adminType === 'vote' && (
          <div className="rounded-[14px] border border-secondary-800 p-[14px]">
            <p className="mb-[12px] text-body-13 font-bold text-secondary-1">푸시 알림</p>
            <div className="flex flex-col gap-[12px]">
              <CheckboxField label="푸시 사용" name="pushEnabled" defaultChecked={voteInitial?.pushEnabled} />
              <Field label="푸시 발송 시간" name="pushSendAt" type="datetime-local" defaultValue={toDateTimeInput(voteInitial?.pushSendAt)} />
              <Field label="푸시 제목" name="pushTitle" defaultValue={voteInitial?.pushTitle} />
              <TextAreaField label="푸시 내용" name="pushBody" defaultValue={voteInitial?.pushBody} />
            </div>
          </div>
        )}

        {adminType === 'music' ? (
          <PublishSetting defaultActive={musicInitial?.active ?? true} />
        ) : (
          <div className="flex flex-col gap-[8px]">
            <CheckboxField label="긴급 총공으로 노출" name="menuUrgent" defaultChecked={initial?.menuUrgent} />
            <CheckboxField label="오늘 화면 노출" name="todayExposed" defaultChecked={initial?.todayExposed} />
            <CheckboxField label="활성 상태" name="active" defaultChecked={initial?.active ?? true} />
          </div>
        )}

        {submitError && <p role="alert" className="text-body-12 text-accent-red">{submitError}</p>}
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
