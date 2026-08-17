import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDetailList from '@/components/admin/AdminDetailList';

export default function VoteAdminDetailsPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'VOTE_ADMIN']}>
      <AdminDetailList adminType="vote" />
    </AdminAccessGate>
  );
}

