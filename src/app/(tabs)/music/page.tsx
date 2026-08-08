'use client';

import { SectionTitle } from '@/components/common/SectionTitle';
import OneClickBlock, {
  OneClickBlockProps,
} from '@/components/music/OneClickBlock';
import MusicGuideContainer from '@/components/music/MusicGuideContainer';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const MUSIC_TABS = [
  { id: 'streaming', title: '스트리밍' },
  { id: 'album', title: '앨범 구매' },
  { id: 'guide', title: '음원 가이드' },
  { id: 'notice', title: '공지' },
] as const;

type MusicTab = (typeof MUSIC_TABS)[number]['id'];

const ONE_CLICK_MOCK: OneClickBlockProps[] = [
  { id: '0', platform: 'melon', links: ['a', 'b', 'c'] },
  { id: '1', platform: 'genie', links: ['a', 'b', 'c'] },
  { id: '2', platform: 'bugs', links: ['a', 'b', 'c'] },
  { id: '3', platform: 'flo', links: ['a', 'b', 'c'] },
  { id: '4', platform: 'vibe', links: ['a', 'b', 'c'] },
  { id: '5', platform: 'spotify', links: ['a', 'b', 'c'] },
  { id: '6', platform: 'applemusic', links: ['a', 'b', 'c'] },
  { id: '7', platform: 'youtubemusic', links: ['a', 'b', 'c'] },
  { id: '8', platform: 'musicvideo', links: ['a', 'b', 'c'] },
];

function isMusicTab(value: string | null): value is MusicTab {
  return MUSIC_TABS.some((tab) => tab.id === value);
}

function MusicPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const activeTab: MusicTab = isMusicTab(tabParam) ? tabParam : 'streaming';

  const handleTabChange = (tab: MusicTab) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('tab', tab);

    if (tab !== 'guide') {
      params.delete('guide');
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <main>
        {/* HEADER */}
        <div className="flex justify-center py-[14px] text-title-17 font-bold">
          음원
        </div>
        {/* TABS */}
        <div className="-mx-5 mb-[24px] border-b-2 border-[#555555]">
          <div className="flex h-[44px] items-center" role="tablist">
            {MUSIC_TABS.map((tab) => (
              <button
                type="button"
                key={tab.id}
                id={`music-tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`music-panel-${tab.id}`}
                onClick={() => handleTabChange(tab.id)}
                className={`flex h-[44px] pt-[10px] pb-[16px] flex-1 items-center justify-center text-body-14 ${
                  activeTab === tab.id
                    ? '-mb-[2px] border-b-2 border-secondary-1 font-bold text-secondary-1'
                    : 'font-normal text-[#777777]'
                }`}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 */}
        <section
          id={`music-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`music-tab-${activeTab}`}
        >
          {/* 스트리밍 탭 화면 */}
          {activeTab === 'streaming' && (
            <>
              <div className="flex justify-between items-center rounded-full border border-[#ECE818] mb-[24px] px-[16px] py-[12px] bg-[rgba(255,251,31,0.04)]">
                <div className="flex gap-[4px]">
                  <p className="font-bold text-body-13">🚨</p>
                  <p className="font-bold text-body-13">
                    오늘 저녁 12시 30분 멜론 개별곡 다운로드 총공
                  </p>
                </div>
                <Image
                  src={'/icon/arrow-right_gray-24.svg'}
                  alt="arrowIcon"
                  width={18}
                  height={18}
                />
              </div>
              <div className="mb-[32px]">
                <SectionTitle>원클릭 스트리밍</SectionTitle>
                <div className="grid grid-cols-3 gap-[8px]">
                  {ONE_CLICK_MOCK.map((oneClick) => (
                    <OneClickBlock
                      key={oneClick.id}
                      id={oneClick.id}
                      platform={oneClick.platform}
                      links={oneClick.links}
                    />
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle
                  action={
                    <div className="flex items-baseline">
                      <span className="text-body-13 text-secondary-400">
                        최신 업데이트
                      </span>
                      <span className="text-body-13 px-[6px] font-bold text-secondary-700">
                        |
                      </span>
                      <span className="text-body-13 text-secondary-400">
                        7/19 18:00
                      </span>
                    </div>
                  }
                >
                  스트리밍 리스트
                </SectionTitle>
                <div className="relative h-[440px] w-full overflow-hidden rounded-[16px]">
                  <Image
                    className="rounded-[16px] object-cover"
                    src={'/streaming_list.png'}
                    alt="streamingList"
                    fill
                    sizes="(max-width: 430px) calc(100vw - 40px), 390px"
                  />
                </div>
              </div>
            </>
          )}
          {/* {activeTab === 'album' && <AlbumTab />} */}
          {activeTab === 'guide' && <MusicGuideContainer />}
          {/* {activeTab === 'notice' && <NoticeTab />} */}
        </section>
      </main>
    </>
  );
}

export default function MusicPage() {
  return (
    <Suspense fallback={null}>
      <MusicPageContent />
    </Suspense>
  );
}
