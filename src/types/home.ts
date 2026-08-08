export type CHEERING_CATEGORY =
  | 'STREAMING'
  | 'DOWNLOAD'
  | 'VOTE'
  | 'YOUTUBE'
  | 'VOTECOIN'
  | 'REPORT'
  | 'HASHTAG';

export type UrgentDetail = {
  menuType: string;
  detailId: number;
  category: string;
  title: string;
  songName: string;
  content: string | null;
  platform: string;
  checklist: string[];
  imageUrl: string | null;
  eventEndAt: string | null;
};

export type CheeringItem = {
  id: string;
  category: CHEERING_CATEGORY;
  title: string;
  subtitle?: string; // 노래제목, 등
  completed: boolean;
};

export type HomeResponse = {
  participantCount: number;
  totalCheeringCount: number;
  completedCheeringCount: number;
  urgentDetail: UrgentDetail | null;
  cheeringItems: CheeringItem[];
};
