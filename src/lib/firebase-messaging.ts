'use client';

export type PushPermissionErrorCode =
  | 'UNSUPPORTED'
  | 'DENIED'
  | 'MISSING_VAPID_KEY'
  | 'TOKEN_UNAVAILABLE';

export class PushPermissionError extends Error {
  code: PushPermissionErrorCode;

  constructor(code: PushPermissionErrorCode, message: string) {
    super(message);
    this.name = 'PushPermissionError';
    this.code = code;
  }
}

export async function requestFcmToken() {
  if (
    typeof window === 'undefined' ||
    !('Notification' in window) ||
    !('serviceWorker' in navigator)
  ) {
    throw new PushPermissionError(
      'UNSUPPORTED',
      '이 기기에서는 알림을 사용할 수 없어요.',
    );
  }

  const { getMessaging, getToken, isSupported } = await import(
    'firebase/messaging'
  );

  if (!(await isSupported())) {
    throw new PushPermissionError(
      'UNSUPPORTED',
      '이 기기에서는 알림을 사용할 수 없어요.',
    );
  }

  const permission =
    Notification.permission === 'default'
      ? await Notification.requestPermission()
      : Notification.permission;

  if (permission !== 'granted') {
    throw new PushPermissionError(
      'DENIED',
      '기기 설정에서 BIGBANG MADE VIP 알림을 허용해 주세요.',
    );
  }

  const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

  if (!vapidKey) {
    throw new PushPermissionError(
      'MISSING_VAPID_KEY',
      '알림 설정을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
    );
  }

  const registration = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;

  const { firebaseApp } = await import('@/lib/firebase');
  const token = await getToken(getMessaging(firebaseApp), {
    vapidKey,
    serviceWorkerRegistration: registration,
  });

  if (!token) {
    throw new PushPermissionError(
      'TOKEN_UNAVAILABLE',
      '알림 기기 정보를 만들지 못했어요. 다시 시도해 주세요.',
    );
  }

  return token;
}
