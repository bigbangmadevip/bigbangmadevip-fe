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
import {
  DetailImageUpload,
  Field,
  INPUT_CLASS,
  PublishSetting,
  ToggleSwitch,
  type ImageItem,
} from '@/components/admin/adminFormFields';
import { AppDialog } from '@/components/common/AppDialog';
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

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

function getWeekdayLabel(dateValue: string) {
  if (!dateValue) return '';
  const date = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return `(${WEEKDAY_LABELS[date.getDay()]})`;
}

function DateField({
  name,
  defaultValue,
  required = false,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  const [value, setValue] = useState(defaultValue ?? '');

  return (
    <div className="flex min-w-0 items-center gap-[8px]">
      <input
        name={name}
        type="date"
        required={required}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="h-[48px] w-full min-w-0 rounded-[10px] border border-secondary-800 bg-secondary-900 px-[12px] text-body-13 text-secondary-1 outline-none focus:border-secondary-500 [color-scheme:dark]"
      />
      {getWeekdayLabel(value) && (
        <span className="shrink-0 text-body-12 text-secondary-400">
          {getWeekdayLabel(value)}
        </span>
      )}
    </div>
  );
}

const MUSIC_PLATFORM_OPTIONS = {
  melon: { id: 1, label: '멜론' },
  genie: { id: 2, label: '지니' },
  bugs: { id: 3, label: '벅스' },
  flo: { id: 4, label: '플로' },
  vibe: { id: 5, label: '바이브' },
  samsungmusic: { id: 6, label: '삼성뮤직' },
  spotify: { id: 7, label: '스포티파이' },
  applemusic: { id: 8, label: '애플뮤직' },
  youtubemusic: { id: 9, label: '유튜브뮤직' },
  melonmv: { id: 21, label: '멜론뮤비' },
  kakaomusic: { id: 22, label: '카카오뮤직' },
};

const MUSIC_CATEGORY_OPTIONS = [
  { value: 'STREAMING', label: '스트리밍' },
  { value: 'DOWNLOAD', label: '다운로드' },
  { value: 'ETC', label: '기타' },
];

const MUSIC_PLATFORMS_BY_CATEGORY: Record<
  string,
  (typeof MUSIC_PLATFORM_OPTIONS)[keyof typeof MUSIC_PLATFORM_OPTIONS][]
> = {
  STREAMING: [
    MUSIC_PLATFORM_OPTIONS.melon,
    MUSIC_PLATFORM_OPTIONS.genie,
    MUSIC_PLATFORM_OPTIONS.bugs,
    MUSIC_PLATFORM_OPTIONS.flo,
    MUSIC_PLATFORM_OPTIONS.vibe,
    MUSIC_PLATFORM_OPTIONS.samsungmusic,
    MUSIC_PLATFORM_OPTIONS.spotify,
    MUSIC_PLATFORM_OPTIONS.applemusic,
    MUSIC_PLATFORM_OPTIONS.youtubemusic,
  ],
  DOWNLOAD: [
    MUSIC_PLATFORM_OPTIONS.melon,
    MUSIC_PLATFORM_OPTIONS.genie,
    MUSIC_PLATFORM_OPTIONS.bugs,
    MUSIC_PLATFORM_OPTIONS.melonmv,
    MUSIC_PLATFORM_OPTIONS.kakaomusic,
  ],
  ETC: [
    MUSIC_PLATFORM_OPTIONS.melon,
    MUSIC_PLATFORM_OPTIONS.genie,
    MUSIC_PLATFORM_OPTIONS.bugs,
    MUSIC_PLATFORM_OPTIONS.flo,
    MUSIC_PLATFORM_OPTIONS.vibe,
    MUSIC_PLATFORM_OPTIONS.samsungmusic,
    MUSIC_PLATFORM_OPTIONS.spotify,
    MUSIC_PLATFORM_OPTIONS.applemusic,
    MUSIC_PLATFORM_OPTIONS.youtubemusic,
    MUSIC_PLATFORM_OPTIONS.kakaomusic,
  ],
};

function PlatformChipFields({
  platforms,
  initialPlatformIds = [],
}: {
  platforms: readonly { id: number; label: string }[];
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
        {platforms.map((platform) => (
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
        disabled={!pendingId || selectedIds.length >= platforms.length}
        className="mt-[8px] flex h-[48px] w-full items-center justify-center rounded-[10px] border border-dashed border-secondary-600 text-body-13 font-bold text-secondary-300 disabled:cursor-not-allowed disabled:text-secondary-700"
      >
        <span className="mr-[8px] text-[22px] font-normal">＋</span> 추가하기
      </button>
      {selectedIds.length > 0 && (
        <ul className="mt-[8px] flex flex-wrap gap-[8px]">
          {selectedIds.map((platformId) => {
            const platform = platforms.find((item) => item.id === platformId);
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

function MusicCategoryAndPlatformFields({
  initialCategory,
  initialPlatformIds = [],
}: {
  initialCategory?: string;
  initialPlatformIds?: number[];
}) {
  const [category, setCategory] = useState(initialCategory ?? '');
  const platforms = MUSIC_PLATFORMS_BY_CATEGORY[category] ?? [];

  return (
    <>
      <label className="block text-body-12 text-secondary-300">
        카테고리<span className="ml-[3px] text-accent-red">*</span>
        <select
          name="category"
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={INPUT_CLASS}
        >
          <option value="" disabled>
            선택해주세요
          </option>
          {MUSIC_CATEGORY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <PlatformChipFields
        key={category}
        platforms={platforms}
        initialPlatformIds={
          category === initialCategory ? initialPlatformIds : []
        }
      />
    </>
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
      <ToggleSwitch
        label="긴급 총공으로 노출"
        name="menuUrgent"
        checked={enabled}
        onChange={setEnabled}
      />
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

function ShortcutButtonSetting({
  ctaButtonLabel,
  platformUrl,
}: {
  ctaButtonLabel?: string | null;
  platformUrl?: string | null;
}) {
  const [enabled, setEnabled] = useState(
    Boolean(ctaButtonLabel || platformUrl),
  );

  return (
    <div className="flex flex-col gap-[10px]">
      <ToggleSwitch
        label="바로가기 버튼 생성"
        checked={enabled}
        onChange={setEnabled}
      />
      {enabled && (
        <>
          <Field
            label="버튼명"
            name="ctaButtonLabel"
            required
            defaultValue={ctaButtonLabel}
            placeholder="투표하러 가기"
          />
          <Field
            label="버튼 연결 URL"
            name="platformUrl"
            type="url"
            required
            defaultValue={platformUrl}
            placeholder="https://"
          />
        </>
      )}
    </div>
  );
}

function ChecklistFields({ initialItems }: { initialItems: string[] }) {
  const [items, setItems] = useState(() =>
    (initialItems.length > 0 ? initialItems : ['']).map((value, index) => ({
      id: index + 1,
      value,
    })),
  );

  return (
    <div>
      <p className="text-body-12 text-secondary-300">체크 사항 (선택)</p>
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
    </div>
  );
}

const VOTE_MUSIC_SHOWS = [
  { id: 1, label: '쇼! 음악중심' },
  { id: 2, label: '뮤직뱅크' },
  { id: 3, label: '인기가요' },
  { id: 4, label: '쇼챔피언' },
  { id: 5, label: '엠카운트다운' },
  { id: 6, label: '더쇼' },
] as const;

const VOTE_PLATFORMS = [
  { id: 10, label: '뮤빗' },
  { id: 11, label: '뮤니버스' },
  { id: 12, label: '쿠궁' },
  { id: 13, label: '하이어' },
  { id: 14, label: '링크' },
  { id: 16, label: '아이돌챔프' },
  { id: 17, label: '엠넷플러스' },
  { id: 18, label: '빅크' },
] as const;

function VoteBaseFields({ initial }: { initial?: AdminVoteDetail }) {
  const [category, setCategory] = useState(initial?.category ?? '');
  const [musicShowId, setMusicShowId] = useState(
    initial?.musicShowId?.toString() ?? '',
  );

  return (
    <>
      <label className="block text-body-12 text-secondary-300">
        총공 카테고리<span className="ml-[3px] text-accent-red">*</span>
        <select
          name="category"
          required
          value={category}
          onChange={(event) => setCategory(event.target.value)}
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
        음악방송 (선택)
        <select
          name="musicShowId"
          value={musicShowId}
          onChange={(event) => setMusicShowId(event.target.value)}
          className={INPUT_CLASS}
        >
          <option value="">선택 안 함</option>
          {VOTE_MUSIC_SHOWS.map((show) => (
            <option key={show.id} value={show.id}>
              {show.label}
            </option>
          ))}
        </select>
      </label>

      <PlatformChipFields
        platforms={VOTE_PLATFORMS}
        initialPlatformIds={initial?.platformIds}
      />
    </>
  );
}

function EventPeriodFields({
  legend,
  required = true,
  eventStartAt,
  eventEndAt,
}: {
  legend: string;
  required?: boolean;
  eventStartAt?: string | null;
  eventEndAt?: string | null;
}) {
  return (
    <fieldset>
      <legend className="text-body-12 text-secondary-300">
        {legend}
        {required && <span className="ml-[3px] text-accent-red">*</span>}
      </legend>
      <div className="mt-[7px] flex flex-col gap-[8px]">
        <div className="grid grid-cols-[minmax(0,1fr)_168px] gap-[8px]">
          <DateField
            name="eventStartDate"
            required={required}
            defaultValue={eventStartAt?.slice(0, 10) ?? ''}
          />
          <Time24Field
            name="eventStartTime"
            required={required}
            defaultValue={eventStartAt?.slice(11, 16)}
          />
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_168px] gap-[8px]">
          <DateField
            name="eventEndDate"
            required={required}
            defaultValue={eventEndAt?.slice(0, 10) ?? ''}
          />
          <Time24Field
            name="eventEndTime"
            required={required}
            defaultValue={eventEndAt?.slice(11, 16)}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default function AdminDetailForm({
  adminType,
  detailId,
}: AdminDetailFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const musicImageItemsRef = useRef<ImageItem[]>([]);
  const voteImageItemsRef = useRef<ImageItem[]>([]);
  const [submitError, setSubmitError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
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
      const imageItems = (
        adminType === 'music' ? musicImageItemsRef : voteImageItemsRef
      ).current;
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

      const common = {
        category: String(formData.get('category') ?? '').trim(),
        title: String(formData.get('title') ?? '').trim(),
        platformIds: numberList(formData.get('platformIds')),
        checklist: formDataStringList(formData, 'checklist'),
        imageUrls,
        guideIds: numberList(formData.get('guideIds')),
        menuUrgent: formData.get('menuUrgent') === 'on',
        urgentContent: nullableString(formData.get('urgentContent')),
        active:
          formData.get('active') === 'on' || formData.get('active') === 'true',
        scheduledAt: null,
        sortOrder: Number(formData.get('sortOrder') ?? 0),
      };

      if (adminType === 'music') {
        const payload: AdminMusicDetailPayload = {
          ...common,
          songName: nullableString(formData.get('songName')),
          eventStartAt: combineDateAndTime(
            formData.get('eventStartDate'),
            formData.get('eventStartTime'),
          ),
          eventEndAt: combineDateAndTime(
            formData.get('eventEndDate'),
            formData.get('eventEndTime'),
          ),
        };
        return detailId
          ? updateAdminMusicDetail(detailId, payload)
          : createAdminMusicDetail(payload);
      }

      const payload: AdminVoteDetailPayload = {
        ...common,
        musicShowId: numberOrNull(formData.get('musicShowId')),
        rewardDescription: nullableString(formData.get('rewardDescription')),
        platformUrl: nullableString(formData.get('platformUrl')),
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
            <MusicCategoryAndPlatformFields
              initialCategory={musicInitial?.category}
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
              placeholder="스트리밍리스트 OR BiiiG"
            />
            <EventPeriodFields
              legend="총공 기간"
              required={false}
              eventStartAt={musicInitial?.eventStartAt}
              eventEndAt={musicInitial?.eventEndAt}
            />
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
            <EventPeriodFields
              legend="총공 기간"
              eventStartAt={voteInitial?.eventStartAt}
              eventEndAt={voteInitial?.eventEndAt}
            />
            <Field
              label="1위 리워드"
              name="rewardDescription"
              required
              defaultValue={voteInitial?.rewardDescription}
            />
          </>
        )}

        <ChecklistFields initialItems={initial?.checklist ?? []} />

        {adminType === 'music' ? (
          <>
            <DetailImageUpload
              initialUrls={musicInitial?.imageUrls ?? []}
              onItemsChange={(items) => {
                musicImageItemsRef.current = items;
              }}
            />
            <UrgentSetting
              menuUrgent={musicInitial?.menuUrgent}
              urgentContent={musicInitial?.urgentContent}
            />
          </>
        ) : (
          <>
            <DetailImageUpload
              initialUrls={voteInitial?.imageUrls ?? []}
              onItemsChange={(items) => {
                voteImageItemsRef.current = items;
              }}
            />
            <ShortcutButtonSetting
              ctaButtonLabel={voteInitial?.ctaButtonLabel}
              platformUrl={voteInitial?.platformUrl}
            />
            <UrgentSetting
              menuUrgent={voteInitial?.menuUrgent}
              urgentContent={voteInitial?.urgentContent}
            />
          </>
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

        <PublishSetting defaultActive={initial?.active ?? true} />

        {submitError && (
          <p role="alert" className="text-body-12 text-accent-red">
            {submitError}
          </p>
        )}
        <div className="mt-[8px] grid grid-cols-2 gap-[8px]">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="w-full rounded-[12px] border border-secondary-700 py-[16px] text-body-14 font-bold text-secondary-200"
          >
            미리보기
          </button>
          <button
            type="submit"
            disabled={mutation.isPending || !isFormValid}
            className="w-full rounded-[12px] bg-main py-[16px] text-body-14 font-bold text-secondary-950 disabled:cursor-not-allowed disabled:bg-secondary-800 disabled:text-secondary-600"
          >
            {mutation.isPending ? '저장 중...' : isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </form>

      <AppDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        title="미리보기"
        description={'조금만 기다려주세요.\n미리보기 기능을 준비하고 있어요.'}
        actions={[{ label: '확인', onClick: () => setPreviewOpen(false) }]}
      />
    </main>
  );
}
