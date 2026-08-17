import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDetailForm from '@/components/admin/AdminDetailForm';

type MusicAdminDetailPageProps = {
  params: Promise<{ detailId: string }>;
};

export default async function MusicAdminDetailPage({ params }: MusicAdminDetailPageProps) {
  const { detailId } = await params;
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'MUSIC_ADMIN']}>
      <AdminDetailForm adminType="music" detailId={detailId} />
    </AdminAccessGate>
  );
}

