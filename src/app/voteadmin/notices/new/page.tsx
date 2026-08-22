import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminNoticeForm from '@/components/admin/AdminNoticeForm';

export default function NewVoteAdminNoticePage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'VOTE_ADMIN']}>
      <AdminNoticeForm menuType="vote" />
    </AdminAccessGate>
  );
}
