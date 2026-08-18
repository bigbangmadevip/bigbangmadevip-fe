'use client';

import Image from 'next/image';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  getAdminMusicStreamingLinks,
  updateAdminMusicStreamingLinks,
} from '@/apis/admin-detail';
import { HeaderIconButton } from '@/components/common/HeaderIconButton';
import LoadingScreen from '@/components/common/LoadingScreen';
import { PageHeader } from '@/components/common/PageHeader';
import type {
  MusicOs,
  MusicStreamingLink,
  MusicStreamingOsGroup,
} from '@/types/music';

const ADMIN_STREAMING_LINKS_QUERY_KEY = [
  'admin',
  'music',
  'streaming-links',
] as const;

const PLATFORMS = [
  { id: 1, label: '멜론' },
  { id: 2, label: '지니' },
  { id: 3, label: '벅스' },
  { id: 4, label: '플로' },
  { id: 5, label: '바이브' },
  { id: 6, label: '삼성뮤직' },
  { id: 7, label: '스포티파이' },
  { id: 8, label: '애플뮤직' },
  { id: 9, label: '유튜브뮤직' },
] as const;

const OS_OPTIONS: { id: MusicOs; label: string }[] = [
  { id: 'ANDROID', label: 'Android' },
  { id: 'IPHONE', label: 'iPhone' },
  { id: 'IPAD', label: 'iPad' },
  { id: 'WINDOWS', label: 'Windows' },
  { id: 'MAC', label: 'Mac' },
];

type LinkDraft = Record<MusicOs, MusicStreamingLink[]>;

function createEmptyDraft(): LinkDraft {
  return {
    ANDROID: [],
    IPHONE: [],
    IPAD: [],
    WINDOWS: [],
    MAC: [],
  };
}

function createDraft(osGroups: MusicStreamingOsGroup[] = []): LinkDraft {
  const draft = createEmptyDraft();

  osGroups.forEach((group) => {
    draft[group.os] = group.links.map((link) => ({
      ...link,
      active: link.active ?? false,
    }));
  });

  return draft;
}

export default function StreamingLinkAdminContainer() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [platformId, setPlatformId] = useState(1);
  const [activeOs, setActiveOs] = useState<MusicOs>('ANDROID');
  const [draft, setDraft] = useState<LinkDraft | null>(null);
  const [saved, setSaved] = useState(false);

  const linksQuery = useQuery({
    queryKey: ADMIN_STREAMING_LINKS_QUERY_KEY,
    queryFn: getAdminMusicStreamingLinks,
  });

  const selectedPlatform = linksQuery.data?.find(
    (platform) => platform.platformId === platformId,
  );
  const serverDraft = useMemo(
    () => createDraft(selectedPlatform?.osGroups),
    [selectedPlatform],
  );
  const currentDraft = draft ?? serverDraft;
  const platformLabel =
    PLATFORMS.find((platform) => platform.id === platformId)?.label ?? '';

  const updateMutation = useMutation({
    mutationFn: (osGroups: MusicStreamingOsGroup[]) =>
      updateAdminMusicStreamingLinks(platformId, { osGroups }),
    onSuccess: async (updatedPlatform) => {
      setDraft(createDraft(updatedPlatform.osGroups));
      setSaved(true);
      await queryClient.invalidateQueries({
        queryKey: ADMIN_STREAMING_LINKS_QUERY_KEY,
      });
    },
  });

  const currentLinks = currentDraft[activeOs];
  const allLinks = Object.values(currentDraft).flat();
  const hasInvalidLink = allLinks.some((link) => link.url.trim().length === 0);
  const canSave =
    allLinks.length > 0 && !hasInvalidLink && !updateMutation.isPending;

  const addLink = () => {
    setSaved(false);
    setDraft((current) => ({
      ...(current ?? serverDraft),
      [activeOs]: [
        ...(current ?? serverDraft)[activeOs],
        { label: '', url: '', active: false },
      ],
    }));
  };

  const updateLink = (
    index: number,
    field: 'url' | 'active',
    value: string | boolean,
  ) => {
    setSaved(false);
    setDraft((current) => {
      const baseDraft = current ?? serverDraft;

      return {
        ...baseDraft,
        [activeOs]: baseDraft[activeOs].map((link, linkIndex) =>
          linkIndex === index ? { ...link, [field]: value } : link,
        ),
      };
    });
  };

  const removeLink = (index: number) => {
    setSaved(false);
    setDraft((current) => {
      const baseDraft = current ?? serverDraft;

      return {
        ...baseDraft,
        [activeOs]: baseDraft[activeOs].filter(
          (_, linkIndex) => linkIndex !== index,
        ),
      };
    });
  };

  const handleSave = () => {
    if (!canSave) return;

    updateMutation.mutate(
      OS_OPTIONS.map(({ id }) => ({
        os: id,
        links: currentDraft[id].map((link, index) => ({
          label: `${platformLabel} 링크 ${index + 1}`,
          url: link.url.trim(),
          active: link.active ?? false,
        })),
      })),
    );
  };

  if (linksQuery.isPending) {
    return <LoadingScreen label="원클릭 링크 불러오는 중" />;
  }

  return (
    <main className="min-h-[calc(100dvh-env(safe-area-inset-top))] px-[20px] pb-[calc(32px+env(safe-area-inset-bottom))]">
      <PageHeader
        title="원클릭 스트리밍 등록"
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

      <section className="mt-[24px]">
        <label
          htmlFor="streaming-platform"
          className="text-body-13 font-bold text-secondary-100"
        >
          플랫폼
        </label>
        <select
          id="streaming-platform"
          value={platformId}
          onChange={(event) => {
            setPlatformId(Number(event.target.value));
            setDraft(null);
            setSaved(false);
            updateMutation.reset();
          }}
          className="mt-[10px] h-[52px] w-full rounded-[12px] border border-secondary-700 bg-secondary-900 px-[14px] text-body-14 text-secondary-1 outline-none"
        >
          {PLATFORMS.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.label}
            </option>
          ))}
        </select>
      </section>

      <section className="mt-[28px]">
        <h2 className="text-body-13 font-bold text-secondary-100">
          운영체제별 링크
        </h2>
        <div className="scrollbar-hidden -mx-5 mt-[10px] flex gap-[8px] overflow-x-auto px-5">
          {OS_OPTIONS.map((os) => (
            <button
              key={os.id}
              type="button"
              onClick={() => setActiveOs(os.id)}
              className={`shrink-0 rounded-full px-[16px] py-[9px] text-body-12 font-bold ${
                activeOs === os.id
                  ? 'bg-main text-secondary-950'
                  : 'bg-secondary-800 text-secondary-300'
              }`}
            >
              {os.label}
              {currentDraft[os.id].length > 0
                ? ` ${currentDraft[os.id].length}`
                : ''}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-[20px] flex flex-col gap-[12px]">
        {currentLinks.length === 0 ? (
          <div className="rounded-[16px] border border-dashed border-secondary-700 py-[40px] text-center">
            <p className="text-body-13 text-secondary-400">
              등록된 링크가 없어요.
            </p>
          </div>
        ) : (
          currentLinks.map((link, index) => (
            <div
              key={`${activeOs}-${index}`}
              className="rounded-[16px] border border-secondary-800 bg-secondary-900 p-[16px]"
            >
              <div className="flex items-center justify-between">
                <strong className="text-body-13 text-secondary-100">
                  {index + 1}번 링크
                </strong>
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="text-body-12 text-accent-red"
                >
                  삭제
                </button>
              </div>

              <input
                aria-label={`${index + 1}번 링크 URL`}
                value={link.url}
                onChange={(event) =>
                  updateLink(index, 'url', event.target.value)
                }
                placeholder="예: melonapp://streaming"
                className="mt-[14px] h-[48px] w-full rounded-[10px] border border-secondary-700 bg-secondary-950 px-[12px] text-body-13 text-secondary-1 outline-none placeholder:text-secondary-600"
              />

              <label className="mt-[12px] flex cursor-pointer items-center justify-between rounded-[10px] bg-secondary-950 px-[12px] py-[11px] text-body-12 text-secondary-200">
                공개
                <input
                  type="checkbox"
                  checked={link.active !== false}
                  onChange={(event) =>
                    updateLink(index, 'active', event.target.checked)
                  }
                  className="h-[20px] w-[20px] accent-[#FFFB1F]"
                />
              </label>
            </div>
          ))
        )}

        <button
          type="button"
          onClick={addLink}
          className="w-full rounded-[12px] border border-secondary-700 py-[13px] text-body-13 font-bold text-secondary-100"
        >
          + {OS_OPTIONS.find((os) => os.id === activeOs)?.label} 링크 추가
        </button>
      </section>

      {linksQuery.isError && (
        <p role="alert" className="mt-[16px] text-body-12 text-accent-red">
          기존 링크를 불러오지 못했어요. 저장 전 다시 확인해주세요.
        </p>
      )}
      {updateMutation.isError && (
        <p role="alert" className="mt-[16px] text-body-12 text-accent-red">
          링크를 저장하지 못했어요. 잠시 후 다시 시도해주세요.
        </p>
      )}
      {saved && (
        <p role="status" className="mt-[16px] text-body-12 text-main">
          저장했어요.
        </p>
      )}

      <p className="mt-[28px] text-body-11 text-secondary-400">
        저장하지 않고 다른 플랫폼을 선택 시 초기화 될 수 있어요.
      </p>

      <button
        type="button"
        disabled={!canSave}
        onClick={handleSave}
        className={`mt-[8px] w-full rounded-[12px] py-[16px] text-body-14 font-bold ${
          canSave
            ? 'bg-main text-secondary-950'
            : 'cursor-not-allowed bg-secondary-800 text-secondary-600'
        }`}
      >
        {updateMutation.isPending ? '저장 중...' : '플랫폼 링크 전체 저장'}
      </button>
    </main>
  );
}
