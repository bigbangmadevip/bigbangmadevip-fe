import MusicNoticeLinkBtn from './MusicNoticeLinkBtn';
import MusicNoticeListItem from './MusicNoticeListItem';
import { MUSIC_NOTICE_MOCK_DATA } from './mock';
import Image from 'next/image';

export default function MusicGuideContainer() {
  return (
    <section className="mt-[24px]">
      <MusicNoticeLinkBtn
        iconSrc={'/icon/x-logo-circle.svg'}
        title={'음원총공팀 X 바로가기'}
        description={'실시간 공지와 긴급 안내를 확인하세요!'}
        href={'https://x.com/__vipwave__?s=11'}
      />

      {MUSIC_NOTICE_MOCK_DATA ? (
        <div>
          {MUSIC_NOTICE_MOCK_DATA.map(({ id, ...notice }) => (
            <MusicNoticeListItem key={id} noticeId={id} {...notice} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex min-h-[calc(100dvh-env(safe-area-inset-top)-340px)] flex-col items-center justify-center gap-[2px]">
            <Image
              src={'/icon/empty.svg'}
              alt="EmptyIcon"
              width={64}
              height={64}
            />
            <p className="text-body-13 text-secondary-500">
              올라온 공지가 없어요.
            </p>
          </div>
        </>
      )}
    </section>
  );
}
