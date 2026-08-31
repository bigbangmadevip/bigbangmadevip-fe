export type VoteCategory =
  | 'all'
  | 'awards'
  | 'music-show'
  | 'anniversary'
  | 'etc';

export type VoteGuideCategory = 'all' | 'music-show' | 'awards' | 'etc';

export type VoteDetailGuide = {
  guideId: number;
  guideType: string;
  title: string;
};

export type VoteDetailResponse = {
  id: number;
  category: 'MUSIC_SHOW' | 'AWARDS' | 'ANNIVERSARY' | 'ETC';
  title: string;
  eventStartAt: string | null;
  eventEndAt: string | null;
  rewardDescription: string | null;
  platformNames: string[];
  platformUrl: string | null;
  ctaButtonLabel: string | null;
  checklist: string[];
  imageUrls: string[];
  guides: VoteDetailGuide[];
};

export type VoteTodayUrgent = {
  detailId: number;
  urgentContent: string;
};

export type VoteTodayItem = {
  detailId: number;
  category: VoteDetailResponse['category'];
  title: string;
  platformNames: string[];
  eventEndAt: string;
  imageUrl: string | null;
};

export type VoteTodayResponse = {
  urgent: VoteTodayUrgent | null;
  dueSoonVotes: VoteTodayItem[];
  votes: VoteTodayItem[];
};

export type VoteNoticeListItem = {
  id: number;
  title: string;
  createdAt: string;
  pinned: boolean;
};

export type VoteNoticeLinkItem = {
  label: string;
  url: string;
};

export type VoteNoticeDetail = VoteNoticeListItem & {
  content: string;
  imageUrls: string[];
  links: VoteNoticeLinkItem[];
};
