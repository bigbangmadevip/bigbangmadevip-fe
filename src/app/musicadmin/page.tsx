import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function MusicAdminPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <AdminDashboard adminType="music" />
    </AdminAccessGate>
  );
}
