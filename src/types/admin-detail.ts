export type AdminDetailBase = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type AdminMusicDetailPayload = {
  category: string;
  title: string;
  songName: string | null;
  platformIds: number[];
  eventStartAt: string | null;
  eventEndAt: string | null;
  checklist: string[];
  imageUrls: string[];
  menuUrgent: boolean;
  urgentContent: string | null;
  active: boolean;
  scheduledAt: string | null;
};

export type AdminMusicDetail = AdminDetailBase & AdminMusicDetailPayload;

export type AdminVoteDetailPayload = {
  category: string;
  title: string;
  musicShowId: number | null;
  rewardDescription: string | null;
  platformIds: number[];
  platformUrl: string | null;
  eventStartAt: string | null;
  eventEndAt: string | null;
  checklist: string[];
  imageUrls: string[];
  ctaButtonLabel: string | null;
  menuUrgent: boolean;
  urgentContent: string | null;
  active: boolean;
  scheduledAt: string | null;
  // 알림 설정 관련값
  pushEnabled: boolean;
  pushSendAt: string | null;
  pushTitle: string | null;
  pushBody: string | null;
};

export type AdminVoteDetail = AdminDetailBase & AdminVoteDetailPayload;
