export type TodayCheering = {
  completedCount: number;
  totalCount: number;
};

export type CheeringRecordSummary = {
  totalParticipationCount: number;
  participatedDayCount: number;
  participatedDayCountThisMonth: number;
  firstParticipatedDate: string | null;
};

export type MyPageResponse = {
  todayCheering: TodayCheering;
  cheeringRecord: CheeringRecordSummary;
};

export type CheeringCalendarResponse = {
  yearMonth: string;
  participatedDates: string[];
};

export type CheeringRecordItem = {
  id: string;
  title: string;
};

export type CheeringRecordsResponse = {
  date: string;
  completedCount: number;
  items: CheeringRecordItem[];
};
