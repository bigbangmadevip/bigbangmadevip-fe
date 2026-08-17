export type AdminDetailBase = {
  id: number;
  title: string;
  category: string;
  menuUrgent: boolean;
  urgentContent: string | null;
  todayExposed: boolean;
  active: boolean;
  scheduledAt: string | null;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type AdminMusicDetailPayload = {
  category: string;
  title: string;
  songName: string | null;
  platformIds: number[];
  platformUrl: string | null;
  eventAt: string | null;
  description: string | null;
  checklist: string[];
  imageUrls: string[];
  guideIds: number[];
  cheeringItemId: number | null;
  menuUrgent: boolean;
  urgentContent: string | null;
  todayExposed: boolean;
  active: boolean;
  scheduledAt: string | null;
  sortOrder: number;
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
  guideIds: number[];
  ctaButtonLabel: string | null;
  cheeringItemId: number | null;
  menuUrgent: boolean;
  urgentContent: string | null;
  todayExposed: boolean;
  active: boolean;
  scheduledAt: string | null;
  pushEnabled: boolean;
  pushSendAt: string | null;
  pushTitle: string | null;
  pushBody: string | null;
  sortOrder: number;
};

export type AdminVoteDetail = AdminDetailBase & AdminVoteDetailPayload;

