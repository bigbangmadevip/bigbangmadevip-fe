import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminNoticeForm from '@/components/admin/AdminNoticeForm';

type MusicAdminNoticePageProps = {
  params: Promise<{ noticeId: string }>;
};

export default async function MusicAdminNoticePage({
  params,
}: MusicAdminNoticePageProps) {
  const { noticeId } = await params;
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <AdminNoticeForm menuType="music" noticeId={noticeId} />
    </AdminAccessGate>
  );
}
