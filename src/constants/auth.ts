export type LoginErrorType = 'KAKAO' | 'NETWORK' | 'SERVER';

type LoginErrorContent = {
  title: string;
  description: string;
};

export const LOGIN_ERROR_CONTENT: Record<LoginErrorType, LoginErrorContent> = {
  KAKAO: {
    title: '카카오 로그인에 실패했어요.',
    description: '잠시 후 다시 시도해주세요.',
  },
  NETWORK: {
    title: '연결이 원활하지 않아요.',
    description: '잠시 후 다시 시도해주세요.',
  },
  SERVER: {
    title: '알 수 없는 오류가 발생했어요.',
    description: '잠시 후 다시 시도해주세요.',
  },
};
