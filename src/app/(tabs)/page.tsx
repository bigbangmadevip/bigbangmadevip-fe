'use client';

import HomeContainer from '@/components/home/HomeContainer';
import { useEffect, useState } from 'react';
import { getHomeData } from '../apis/home';
import { HomeResponse } from '@/types/home';

// const getHomeData = async () => {
//   try {
//     const response = await api.get<HomeResponse>('/api/v1/home');

//     console.log('[GET /api/v1/home]', response.data);

//     return response.data;
//   } catch (error) {
//     console.error('[getHomeData] API 요청 실패', error);
//     throw error;
//   }
// };

export default function Home() {
  // const homeData = await getHomeData();

  const [homeData, setHomeData] = useState<HomeResponse>();

  useEffect(() => {
    getHomeData()
      .then((v) => {
        if (v) setHomeData(v);
      })
      .catch(console.error);
  }, []);

  if (!homeData) return <div>...로딩중</div>;

  return <HomeContainer initialData={homeData} />;
}
