import apiClient from './apiClient';
import { API_URL } from './config';

export interface RelatedInfoDto {
  bucket_name: string | null;
  achievement_title: string | null;
  sender_nickname: string | null;
}

export interface NotificationDto {
  id: number;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  related_info: RelatedInfoDto;
}

export interface NotificationsResponse {
  notifications: NotificationDto[];
  counts: {
    total: number;
    unread: number;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    has_next: boolean;
  };
}

export const fetchNotifications = async (
  page: number = 1,
  limit: number = 500
): Promise<NotificationsResponse> => {
  const response = await apiClient(
    `${API_URL}/notification/?page=${page}&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch notifications');
  }
  return response.json();
};

export const deleteNotification = async (id: number): Promise<void> => {
  const response = await apiClient(`${API_URL}/notification/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete notification');
  }
};

export const readAllNotifications = async (): Promise<void> => {
  const response = await apiClient(`${API_URL}/notification/read-all`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to mark all as read');
  }
};


