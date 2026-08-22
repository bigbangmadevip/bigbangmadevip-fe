import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminNoticeForm from '@/components/admin/AdminNoticeForm';

type VoteAdminNoticePageProps = {
  params: Promise<{ noticeId: string }>;
};

export default async function VoteAdminNoticePage({
  params,
}: VoteAdminNoticePageProps) {
  const { noticeId } = await params;
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'VOTE_ADMIN']}>
      <AdminNoticeForm menuType="vote" noticeId={noticeId} />
    </AdminAccessGate>
  );
}
