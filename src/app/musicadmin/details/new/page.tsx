import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDetailForm from '@/components/admin/AdminDetailForm';

export default function NewMusicAdminDetailPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <AdminDetailForm adminType="music" />
    </AdminAccessGate>
  );
}

