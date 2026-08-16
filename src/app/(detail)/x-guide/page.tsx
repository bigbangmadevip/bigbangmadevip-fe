'use client';

import { Suspense } from 'react';
import XGuideContainer from '@/components/x-guide/XGuideContainer';

export default function XGuidePage() {
  return (
    <Suspense fallback={null}>
      <XGuideContainer />
    </Suspense>
  );
}
