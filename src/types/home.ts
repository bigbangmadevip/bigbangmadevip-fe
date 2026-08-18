export type MenuType = 'MUSIC' | 'VOTE';

export type CheeringCategory =
  | 'STREAMING'
  | 'DOWNLOAD'
  | 'VOTE'
  | 'YOUTUBE'
  | 'VOTECOIN'
  | 'REPORT'
  | 'HASHTAG'
  | 'MELONKCHART'
  | 'RADIO';

export type CHEERING_CATEGORY = CheeringCategory;

type UrgentDetailBase = {
  detailId: number;
  category: CheeringCategory;
  title: string;
  platformNames: string[];
};

export type UrgentDetail =
  | (UrgentDetailBase & {
      menuType: 'MUSIC';
      eventEndAt: null;
    })
  | (UrgentDetailBase & {
      menuType: 'VOTE';
      eventEndAt: string;
    });

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
  urgentDetail: UrgentDetail | null;
  todaySchedule: TodaySchedule[];
  cheeringItems: CheeringItem[];
};
