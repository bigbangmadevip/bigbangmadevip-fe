import MusicNoticeDetail from '@/components/music/MusicNotice/MusicNoticeDetail';

interface MusicNoticeDetailPageProps {
  params: Promise<{
    noticeId: string;
  }>;
}

export default async function MusicNoticeDetailPage({
  params,
}: MusicNoticeDetailPageProps) {
  const { noticeId } = await params;

  return <MusicNoticeDetail noticeId={noticeId} />;
}
