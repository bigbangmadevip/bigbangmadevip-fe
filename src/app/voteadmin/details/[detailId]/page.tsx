import AdminAccessGate from '@/components/admin/AdminAccessGate';
import AdminDetailForm from '@/components/admin/AdminDetailForm';

type VoteAdminDetailPageProps = {
  params: Promise<{ detailId: string }>;
};

export default async function VoteAdminDetailPage({ params }: VoteAdminDetailPageProps) {
  const { detailId } = await params;
  return (
    <AdminAccessGate allowedRoles={['MASTER', 'VOTE_ADMIN']}>
      <AdminDetailForm adminType="vote" detailId={detailId} />
    </AdminAccessGate>
  );
}

