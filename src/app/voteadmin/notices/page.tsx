import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminNoticeList from '@/components/admin/AdminNoticeList';

export default function VoteAdminNoticesPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'VOTE_ADMIN']}>
      <AdminNoticeList menuType="vote" />
    </AdminAccessGate>
  );
}
