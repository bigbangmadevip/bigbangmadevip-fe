export type MenuType = 'MUSIC' | 'VOTE';

export type CheeringCategory =
  | 'STREAMING'
  | 'DOWNLOAD'
  | 'PREVOTE'
  | 'YOUTUBEMV'
  | 'VOTECOIN'
  | 'REPORT'
  | 'HASHTAG'
  | 'MELONKCHART'
  | 'RADIO'
  | 'MELONWEEKLY';

export type CHEERING_CATEGORY = CheeringCategory;

export type UrgentCategory =
  | 'STREAMING'
  | 'DOWNLOAD'
  | 'MUSICSHOW'
  | 'AWARDS'
  | 'ANNIVERSARY'
  | 'ETC';

export type UrgentDetail = {
  menuType: 'MUSIC' | 'VOTE';
  detailId: number;
  category: UrgentCategory;
  title: string;
  platformNames: string[];
  eventEndAt: string | null;
};

export type TodaySchedule = {
  menuType: MenuType;
  detailId: number;
  title: string;
  time: string;
  platformNames: string[];
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
  urgentDetails: UrgentDetail[] | null;
  todaySchedule: TodaySchedule[];
  cheeringItems: CheeringItem[];
};
