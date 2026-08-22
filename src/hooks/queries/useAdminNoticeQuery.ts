import { useQuery } from '@tanstack/react-query';
import { getAdminNotice, getAdminNotices } from '@/apis/admin-notice';

type NoticeMenuType = 'music' | 'vote';

export const ADMIN_NOTICE_QUERY_KEYS = {
  all: (menuType: NoticeMenuType) => ['admin-notices', menuType] as const,
  detail: (menuType: NoticeMenuType, id: string) =>
    [...ADMIN_NOTICE_QUERY_KEYS.all(menuType), id] as const,
};

export function useAdminNoticesQuery(
  menuType: NoticeMenuType,
  enabled = true,
) {
  return useQuery({
    queryKey: ADMIN_NOTICE_QUERY_KEYS.all(menuType),
    queryFn: () => getAdminNotices(menuType),
    enabled,
  });
}

export function useAdminNoticeQuery(
  menuType: NoticeMenuType,
  id: string,
  enabled = true,
) {
  return useQuery({
    queryKey: ADMIN_NOTICE_QUERY_KEYS.detail(menuType, id),
    queryFn: () => getAdminNotice(menuType, id),
    enabled: enabled && id.length > 0,
  });
}
