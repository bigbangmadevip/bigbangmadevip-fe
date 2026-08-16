import { notFound } from 'next/navigation';
import VoteGuideDetailContainer from '@/components/vote/VoteGuide/VoteGuideDetailContainer';
import {
  isVoteGuideDetailId,
  VOTE_GUIDE_DETAIL,
} from '@/constants/vote-guide-detail';

type VoteGuideDetailPageProps = {
  params: Promise<{ guideId: string }>;
};

export default async function VoteGuideDetailPage({
  params,
}: VoteGuideDetailPageProps) {
  const { guideId } = await params;

  if (!isVoteGuideDetailId(guideId)) {
    notFound();
  }

  return <VoteGuideDetailContainer guide={VOTE_GUIDE_DETAIL[guideId]} />;
}
