import VoteNoticeDetail from '@/components/vote/VoteNotice/VoteNoticeDetail';

interface VoteNoticeDetailPageProps {
  params: Promise<{
    noticeId: string;
  }>;
}

export default async function VoteNoticeDetailPage({
  params,
}: VoteNoticeDetailPageProps) {
  const { noticeId } = await params;

  return <VoteNoticeDetail noticeId={noticeId} />;
}
