import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function VoteAdminPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'VOTE_ADMIN']}>
      <AdminDashboard adminType="vote" />
    </AdminAccessGate>
  );
}
