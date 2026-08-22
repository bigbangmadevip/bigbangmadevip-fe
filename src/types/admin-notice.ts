export type AdminNoticeMenuType = 'MUSIC' | 'VOTE';

export type AdminNoticeLink = {
  label: string;
  url: string;
};

export type AdminNoticePayload = {
  title: string;
  content: string;
  imageUrls: string[];
  links: AdminNoticeLink[];
  pinned: boolean;
  active: boolean;
};

export type AdminNotice = AdminNoticePayload & {
  id: number;
  menuType: AdminNoticeMenuType;
  createdAt: string;
  updatedAt: string | null;
  updatedBy: string | null;
};
