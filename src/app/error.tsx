'use client';

import { useEffect } from 'react';
import CommonErrorScreen from '@/components/common/CommonErrorScreen';

type ErrorPageProps = {
  error: Error & { digest?: string };
};

export default function ErrorPage({ error }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <CommonErrorScreen />;
}
