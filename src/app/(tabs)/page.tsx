'use client';

import HomeContainer from '@/components/home/HomeContainer';
import { useHomeQuery } from '@/hooks/queries/useHomeQuery';

export default function Home() {
  const { data: homeData, isPending, isError } = useHomeQuery();

  if (isPending) return <div>...로딩중</div>;
  // TODO: 404 PAGE
  if (isError || !homeData) return <div>홈 정보를 불러오지 못했어요.</div>;

  return <HomeContainer initialData={homeData} />;
}
