import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminNoticeForm from '@/components/admin/AdminNoticeForm';

export default function NewMusicAdminNoticePage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <AdminNoticeForm menuType="music" />
    </AdminAccessGate>
  );
}
