import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminNoticeList from '@/components/admin/AdminNoticeList';

export default function MusicAdminNoticesPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <AdminNoticeList menuType="music" />
    </AdminAccessGate>
  );
}
