'use client';

import HomeContainer from '@/components/home/HomeContainer';
import LoadingScreen from '@/components/common/LoadingScreen';
import { useHomeQuery } from '@/hooks/queries/useHomeQuery';

export default function Home() {
  const { data: homeData, isPending, isError } = useHomeQuery();

  if (isPending) return <LoadingScreen label="홈 정보 불러오는 중" />;
  // TODO: 404 PAGE
  if (isError || !homeData) return <div>홈 정보를 불러오지 못했어요.</div>;

  return <HomeContainer initialData={homeData} />;
}
