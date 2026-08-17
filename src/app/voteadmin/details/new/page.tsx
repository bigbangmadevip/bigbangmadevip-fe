import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDetailForm from '@/components/admin/AdminDetailForm';

export default function NewVoteAdminDetailPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'VOTE_ADMIN']}>
      <AdminDetailForm adminType="vote" />
    </AdminAccessGate>
  );
}

