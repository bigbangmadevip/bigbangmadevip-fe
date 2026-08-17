import ServiceNoticeDetail from '@/components/mypage/ServiceNoticeDetail';

type ServiceNoticeDetailPageProps = {
  params: Promise<{ noticeId: string }>;
};

export default async function ServiceNoticeDetailPage({
  params,
}: ServiceNoticeDetailPageProps) {
  const { noticeId } = await params;

  return <ServiceNoticeDetail noticeId={noticeId} />;
}
