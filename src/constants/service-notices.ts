export type ServiceNotice = {
  id: string;
  title: string;
  createdAt: string;
  content: string;
  pinned: boolean;
};

export const SERVICE_NOTICES: ServiceNotice[] = [];

export function getServiceNotice(noticeId: string) {
  return SERVICE_NOTICES.find(({ id }) => id === noticeId);
}
