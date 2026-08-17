import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDetailList from '@/components/admin/AdminDetailList';

export default function MusicAdminDetailsPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <AdminDetailList adminType="music" />
    </AdminAccessGate>
  );
}

