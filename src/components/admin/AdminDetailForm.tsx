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

function combineDateAndTime(
  dateValue: FormDataEntryValue | null,
  timeValue: FormDataEntryValue | null,
) {
  const date = String(dateValue ?? '').trim();
  const time = String(timeValue ?? '').trim();
  return date && time ? `${date}T${time}:00` : null;
}

function Time24Field({
  name,
  defaultValue,
  required = false,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [hour, setHour] = useState(defaultValue?.slice(0, 2) ?? '');
  const [minute, setMinute] = useState(defaultValue?.slice(3, 5) ?? '');
  const timeValue = hour && minute ? `${hour}:${minute}` : '';

  return (
    <div className="grid grid-cols-2 gap-[8px]">
      <input
        type="text"
        name={name}
        value={timeValue}
        required={required}
        readOnly
        tabIndex={-1}
        aria-label="선택된 시간"
        className="sr-only"
      />
      <label>
        <span className="sr-only">시</span>
        <select
          value={hour}
          onChange={(event) => setHour(event.target.value)}
          className="h-[48px] w-full rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none focus:border-secondary-500"
        >
          <option value="" disabled>
            시
          </option>
          {Array.from({ length: 24 }, (_, index) =>
            String(index).padStart(2, '0'),
          ).map((value) => (
            <option key={value} value={value}>
              {value}시
            </option>
          ))}
        </select>
      </label>
      <label>
        <span className="sr-only">분</span>
        <select
          value={minute}
          onChange={(event) => setMinute(event.target.value)}
          className="h-[48px] w-full rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none focus:border-secondary-500"
        >
          <option value="" disabled>
            분
          </option>
          {Array.from({ length: 60 }, (_, index) =>
            String(index).padStart(2, '0'),
          ).map((value) => (
            <option key={value} value={value}>
              {value}분
            </option>
          ))}
        </select>
      </label>
    </div>
  );
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

function TextAreaField({
  label,
  name,
  defaultValue,
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string | string[] | null;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-body-12 text-secondary-300">
      {label}
      {required && <span className="ml-[3px] text-accent-red">*</span>}
      <textarea
        name={name}
        rows={4}
        defaultValue={
          Array.isArray(defaultValue)
            ? defaultValue.join('\n')
            : (defaultValue ?? '')
        }
        placeholder={placeholder}
        required={required}
        className={`${INPUT_CLASS} resize-y`}
      />
    </label>
  );
}

const MUSIC_PLATFORMS = [
  { id: 1, label: '멜론' },
  { id: 2, label: '지니' },
  { id: 3, label: '벅스' },
  { id: 4, label: '플로' },
  { id: 5, label: '바이브' },
  { id: 6, label: '삼성뮤직' },
  { id: 7, label: '스포티파이' },
  { id: 8, label: '애플뮤직' },
  { id: 9, label: '유튜브뮤직' },
];

function MusicPlatformFields({
  initialPlatformIds = [],
}: {
  initialPlatformIds?: number[];
}) {
  const [selectedIds, setSelectedIds] = useState<number[]>(initialPlatformIds);
  const [pendingId, setPendingId] = useState('');

  const addPlatform = () => {
    const platformId = Number(pendingId);
    if (!platformId || selectedIds.includes(platformId)) return;
    setSelectedIds((current) => [...current, platformId]);
    setPendingId('');
  };

  return (
    <fieldset>
      <legend className="text-body-12 text-secondary-300">
        총공 플랫폼<span className="ml-[3px] text-accent-red">*</span>
      </legend>
      <input
        type="text"
        name="platformIds"
        value={selectedIds.join(',')}
        required
        readOnly
        tabIndex={-1}
        aria-label="선택된 총공 플랫폼"
        className="sr-only"
      />
      <select
        value={pendingId}
        onChange={(event) => setPendingId(event.target.value)}
        className={INPUT_CLASS}
      >
        <option value="">총공 플랫폼을 선택해주세요</option>
        {MUSIC_PLATFORMS.map((platform) => (
          <option
            key={platform.id}
            value={platform.id}
            disabled={selectedIds.includes(platform.id)}
          >
            {platform.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={addPlatform}
        disabled={!pendingId || selectedIds.length >= MUSIC_PLATFORMS.length}
        className="mt-[8px] flex h-[48px] w-full items-center justify-center rounded-[10px] border border-dashed border-secondary-600 text-body-13 font-bold text-secondary-300 disabled:cursor-not-allowed disabled:text-secondary-700"
      >
        <span className="mr-[8px] text-[22px] font-normal">＋</span> 추가하기
      </button>
      {selectedIds.length > 0 && (
        <ul className="mt-[8px] flex flex-wrap gap-[8px]">
          {selectedIds.map((platformId) => {
            const platform = MUSIC_PLATFORMS.find(
              (item) => item.id === platformId,
            );
            if (!platform) return null;

            return (
              <li
                key={platform.id}
                className="flex items-center gap-[8px] rounded-full bg-secondary-800 py-[8px] pr-[10px] pl-[12px] text-body-12 text-secondary-100"
              >
                {platform.label}
                <button
                  type="button"
                  aria-label={`${platform.label} 삭제`}
                  onClick={() =>
                    setSelectedIds((current) =>
                      current.filter((id) => id !== platform.id),
                    )
                  }
                  className="text-body-13 text-secondary-400"
                >
                  ×
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </fieldset>
  );
}

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

function DetailImageUpload({
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
      {error && (
        <p className="mt-[6px] text-body-11 text-accent-red">{error}</p>
      )}
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

function UrgentSetting({
  menuUrgent,
  urgentContent,
}: {
  menuUrgent?: boolean;
  urgentContent?: string | null;
}) {
  const [enabled, setEnabled] = useState(menuUrgent ?? false);

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
          defaultValue={urgentContent}
        />
      )}
    </div>
  );
}

function ReservationSetting({ scheduledAt }: { scheduledAt?: string | null }) {
  const [enabled, setEnabled] = useState(Boolean(scheduledAt));

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
          <div className="mt-[7px] grid grid-cols-[minmax(0,1fr)_168px] gap-[8px]">
            <label>
              <span className="sr-only">예약 날짜</span>
              <input
                name="scheduledDate"
                type="date"
                required
                defaultValue={scheduledAt?.slice(0, 10) ?? ''}
                className="h-[48px] w-full min-w-0 rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none focus:border-secondary-500 [color-scheme:dark]"
              />
            </label>
            <Time24Field
              name="scheduledTime"
              required
              defaultValue={scheduledAt?.slice(11, 16)}
            />
          </div>
        </fieldset>
      )}
    </div>
  );
}

function ChecklistFields({ initialItems }: { initialItems: string[] }) {
  const [items, setItems] = useState(() =>
    (initialItems.length > 0 ? initialItems : [''])
      .slice(0, 5)
      .map((value, index) => ({
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

const VOTE_MUSIC_SHOWS = [
  { id: 1, code: 'SHOWMUSICCORE', label: '쇼! 음악중심' },
  { id: 2, code: 'MUSICBANK', label: '뮤직뱅크' },
  { id: 3, code: 'INKIGAYO', label: '인기가요' },
  { id: 4, code: 'SHOWCHAMPION', label: '쇼챔피언' },
  { id: 5, code: 'MCOUNTDOWN', label: '엠카운트다운' },
  { id: 6, code: 'THESHOW', label: '더쇼' },
] as const;

const VOTE_PLATFORMS = [
  { id: 10, code: 'mubeat', label: '뮤빗', musicShow: 'SHOWMUSICCORE' },
  { id: 11, code: 'muniverse', label: '뮤니버스', musicShow: 'SHOWMUSICCORE' },
  { id: 12, code: 'coogoong', label: '쿠궁', musicShow: 'MUSICBANK' },
  { id: 13, code: 'higher', label: '하이어', musicShow: 'INKIGAYO' },
  { id: 14, code: 'linc', label: '링크', musicShow: 'INKIGAYO' },
  { id: 16, code: 'idolchamp', label: '아이돌챔프', musicShow: 'SHOWCHAMPION' },
  { id: 17, code: 'mnetplus', label: '엠넷플러스', musicShow: 'MCOUNTDOWN' },
  { id: 18, code: 'bigc', label: '빅크', musicShow: 'THESHOW' },
] as const;

const VOTE_DETAIL_OPTIONS = {
  AWARDS: [
    { value: 'MAMA', label: 'MAMA' },
    { value: 'MMA', label: 'MMA' },
  ],
  ANNIVERSARY: [
    { value: 'BIRTHDAY', label: '생일' },
    { value: 'DEBUT', label: '데뷔 기념일' },
    { value: 'ETC_ANNIVERSARY', label: '기타 기념일' },
  ],
  ETC: [{ value: 'ETC', label: '기타' }],
} as const;

function VoteBaseFields({ initial }: { initial?: AdminVoteDetail }) {
  const initialMusicShow = VOTE_MUSIC_SHOWS.find(
    (show) => show.id === initial?.musicShowId,
  );
  const [category, setCategory] = useState(initial?.category ?? '');
  const [detailType, setDetailType] = useState(
    initialMusicShow?.code ?? (initial?.category === 'ETC' ? 'ETC' : ''),
  );
  const [platformId, setPlatformId] = useState(
    initial?.platformIds[0]?.toString() ?? '',
  );

  const detailOptions =
    category === 'MUSIC_SHOW'
      ? VOTE_MUSIC_SHOWS.map((show) => ({
          value: show.code,
          label: show.label,
        }))
      : category === 'AWARDS' ||
          category === 'ANNIVERSARY' ||
          category === 'ETC'
        ? [...VOTE_DETAIL_OPTIONS[category]]
        : [];

  const platformOptions =
    category === 'MUSIC_SHOW' && detailType
      ? VOTE_PLATFORMS.filter((platform) => platform.musicShow === detailType)
      : VOTE_PLATFORMS;

  const selectedMusicShow = VOTE_MUSIC_SHOWS.find(
    (show) => show.code === detailType,
  );

  return (
    <>
      <label className="block text-body-12 text-secondary-300">
        총공 카테고리<span className="ml-[3px] text-accent-red">*</span>
        <select
          name="category"
          required
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setDetailType('');
            setPlatformId('');
          }}
          className={INPUT_CLASS}
        >
          <option value="" disabled>
            선택해주세요
          </option>
          <option value="MUSIC_SHOW">음악방송</option>
          <option value="AWARDS">시상식</option>
          <option value="ANNIVERSARY">기념일</option>
          <option value="ETC">기타</option>
        </select>
      </label>

      <label className="block text-body-12 text-secondary-300">
        총공 구분<span className="ml-[3px] text-accent-red">*</span>
        <select
          name="detailType"
          required
          value={detailType}
          onChange={(event) => {
            setDetailType(event.target.value);
            setPlatformId('');
          }}
          className={INPUT_CLASS}
        >
          <option value="" disabled>
            선택해주세요
          </option>
          {detailOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <input
        type="hidden"
        name="musicShowId"
        value={selectedMusicShow?.id ?? ''}
      />

      <label className="block text-body-12 text-secondary-300">
        총공 플랫폼<span className="ml-[3px] text-accent-red">*</span>
        <select
          name="platformIds"
          required
          value={platformId}
          onChange={(event) => setPlatformId(event.target.value)}
          className={INPUT_CLASS}
        >
          <option value="" disabled>
            선택해주세요
          </option>
          {platformOptions.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

function VotePeriodFields({ initial }: { initial?: AdminVoteDetail }) {
  return (
    <fieldset>
      <legend className="text-body-12 text-secondary-300">
        총공 기간<span className="ml-[3px] text-accent-red">*</span>
      </legend>
      <div className="mt-[7px] flex flex-col gap-[8px]">
        <div className="grid grid-cols-[minmax(0,1fr)_168px] gap-[8px]">
          <span className="sr-only">총공 시작 날짜와 시간</span>
          <input
            name="eventStartDate"
            type="date"
            required
            defaultValue={initial?.eventStartAt?.slice(0, 10) ?? ''}
            className="h-[48px] min-w-0 rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none [color-scheme:dark]"
          />
          <Time24Field
            name="eventStartTime"
            required
            defaultValue={initial?.eventStartAt?.slice(11, 16)}
          />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_168px] gap-[8px]">
          <span className="sr-only">총공 마감 날짜와 시간</span>
          <input
            name="eventEndDate"
            type="date"
            required
            defaultValue={initial?.eventEndAt?.slice(0, 10) ?? ''}
            className="h-[48px] min-w-0 rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none [color-scheme:dark]"
          />
          <Time24Field
            name="eventEndTime"
            required
            defaultValue={initial?.eventEndAt?.slice(11, 16)}
          />
        </div>
      </div>
    </fieldset>
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
        공개 시 사용자에게 즉시 노출되며, 비공개 시 관리자만 확인할 수 있습니다.
      </p>
    </section>
  );
}

export default function AdminDetailForm({
  adminType,
  detailId,
}: AdminDetailFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const [submitError, setSubmitError] = useState('');
  const [musicImageFiles, setMusicImageFiles] = useState<File[]>([]);
  const [voteImageFiles, setVoteImageFiles] = useState<File[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);
  const isEdit = Boolean(detailId);
  const musicQuery = useAdminMusicDetailQuery(
    detailId ?? '',
    adminType === 'music' && isEdit,
  );
  const voteQuery = useAdminVoteDetailQuery(
    detailId ?? '',
    adminType === 'vote' && isEdit,
  );
  const detailQuery = adminType === 'music' ? musicQuery : voteQuery;
  const basePath = adminType === 'music' ? '/musicadmin' : '/voteadmin';
  const label = adminType === 'music' ? '음총' : '투총';

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const existingImageUrls = stringList(formData.get('imageUrls'));
      const selectedImageFiles =
        adminType === 'music' ? musicImageFiles : voteImageFiles;
      const imageUrls =
        selectedImageFiles.length > 0
          ? await Promise.all(selectedImageFiles.map(uploadAdminImage))
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
          formData.get('active') === 'on' || formData.get('active') === 'true',
        scheduledAt: combineDateAndTime(
          formData.get('scheduledDate'),
          formData.get('scheduledTime'),
        ),
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
        eventStartAt: combineDateAndTime(
          formData.get('eventStartDate'),
          formData.get('eventStartTime'),
        ),
        eventEndAt: combineDateAndTime(
          formData.get('eventEndDate'),
          formData.get('eventEndTime'),
        ),
        ctaButtonLabel: nullableString(formData.get('ctaButtonLabel')),
        pushEnabled: false,
        pushSendAt: null,
        pushTitle: null,
        pushBody: null,
      };
      return detailId
        ? updateAdminVoteDetail(detailId, payload)
        : createAdminVoteDetail(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          adminType === 'music'
            ? ADMIN_DETAIL_QUERY_KEYS.music()
            : ADMIN_DETAIL_QUERY_KEYS.vote(),
      });
      router.replace(`${basePath}/details`);
    },
    onError: () =>
      setSubmitError('저장하지 못했어요. 입력값과 관리자 권한을 확인해주세요.'),
  });

  if (isEdit && detailQuery.isPending)
    return <LoadingScreen label="상세 불러오는 중" />;
  if (isEdit && detailQuery.isError) {
    return (
      <main className="flex min-h-dvh items-center justify-center text-body-13 text-accent-red">
        상세를 불러오지 못했어요.
      </main>
    );
  }

  const initial = detailQuery.data as InitialDetail;
  const musicInitial =
    adminType === 'music'
      ? (initial as AdminMusicDetail | undefined)
      : undefined;
  const voteInitial =
    adminType === 'vote' ? (initial as AdminVoteDetail | undefined) : undefined;

  return (
    <main className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-5 pb-[calc(32px+env(safe-area-inset-bottom))]">
      <PageHeader
        title={`${label} 총공 ${isEdit ? '수정' : '등록'}`}
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
            <MusicPlatformFields
              initialPlatformIds={musicInitial?.platformIds}
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
              <div className="mt-[7px] grid grid-cols-[minmax(0,1fr)_168px] gap-[8px]">
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
                <Time24Field
                  name="eventTime"
                  required
                  defaultValue={musicInitial?.eventAt?.slice(11, 16)}
                />
              </div>
              <p className="mt-[6px] text-caption-10 text-secondary-500">
                날짜와 시작 시간을 각각 선택해주세요.
              </p>
            </fieldset>
          </>
        ) : (
          <>
            <VoteBaseFields initial={voteInitial} />
            <Field
              label="제목"
              name="title"
              required
              defaultValue={voteInitial?.title}
            />
            <VotePeriodFields initial={voteInitial} />
            <TextAreaField
              label="1위 리워드"
              name="rewardDescription"
              required
              defaultValue={voteInitial?.rewardDescription}
            />
            <Field
              label="버튼명"
              name="ctaButtonLabel"
              defaultValue={voteInitial?.ctaButtonLabel}
              placeholder="투표하러 가기"
            />
            <Field
              label="버튼 연결 URL"
              name="platformUrl"
              type="url"
              defaultValue={voteInitial?.platformUrl}
              placeholder="https://"
            />
          </>
        )}

        <ChecklistFields initialItems={initial?.checklist ?? []} />

        {adminType === 'music' ? (
          <>
            <DetailImageUpload
              existingUrls={musicInitial?.imageUrls ?? []}
              files={musicImageFiles}
              onFilesChange={setMusicImageFiles}
            />
            <UrgentSetting
              menuUrgent={musicInitial?.menuUrgent}
              urgentContent={musicInitial?.urgentContent}
            />
          </>
        ) : (
          <>
            <DetailImageUpload
              existingUrls={voteInitial?.imageUrls ?? []}
              files={voteImageFiles}
              onFilesChange={setVoteImageFiles}
            />
            <UrgentSetting
              menuUrgent={voteInitial?.menuUrgent}
              urgentContent={voteInitial?.urgentContent}
            />
          </>
        )}

        <ReservationSetting scheduledAt={initial?.scheduledAt} />
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
