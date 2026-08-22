import { api } from '@/lib/api';
import type { AdminNotice, AdminNoticePayload } from '@/types/admin-notice';

type ApiResponse<T> = {
  data: T;
  success?: boolean;
};

type NoticeMenuType = 'music' | 'vote';

function noticesPath(menuType: NoticeMenuType) {
  return `/api/v1/admin/${menuType}/notices`;
}

export async function getAdminNotices(menuType: NoticeMenuType) {
  const response = await api.get<ApiResponse<AdminNotice[]>>(
    noticesPath(menuType),
  );
  return response.data.data;
}

export async function getAdminNotice(menuType: NoticeMenuType, id: string) {
  const response = await api.get<ApiResponse<AdminNotice>>(
    `${noticesPath(menuType)}/${id}`,
  );
  return response.data.data;
}

export async function createAdminNotice(
  menuType: NoticeMenuType,
  payload: AdminNoticePayload,
) {
  const response = await api.post<ApiResponse<AdminNotice>>(
    noticesPath(menuType),
    payload,
  );
  return response.data.data;
}

export async function updateAdminNotice(
  menuType: NoticeMenuType,
  id: string,
  payload: AdminNoticePayload,
) {
  const response = await api.put<ApiResponse<AdminNotice>>(
    `${noticesPath(menuType)}/${id}`,
    payload,
  );
  return response.data.data;
}
