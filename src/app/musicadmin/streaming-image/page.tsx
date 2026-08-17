import AdminAccessGate from '@/components/admin/AdminAccessGate';
import StreamingImageUploadContainer from '@/components/admin/StreamingImageUploadContainer';

export default function MusicAdminStreamingImagePage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <StreamingImageUploadContainer />
    </AdminAccessGate>
  );
}
