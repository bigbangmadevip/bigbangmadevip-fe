import AdminAccessGate from '@/components/admin/AdminAccessGate';
import StreamingLinkAdminContainer from '@/components/admin/StreamingLinkAdminContainer';

export default function MusicAdminStreamingLinksPage() {
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <StreamingLinkAdminContainer />
    </AdminAccessGate>
  );
}
