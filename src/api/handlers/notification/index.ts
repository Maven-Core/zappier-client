import { DisplayNotificationDto } from "@/api/dtos/notification/display-notification.dto";
import axios from "../axios/axios-instance";
import { API } from "@/api/dtos/base/api-response-dto";

export const handleGetAllNotifications = async () => {
  return await axios.get<API<DisplayNotificationDto[]>>(`notifications`);
};

export const handleGetUserNotifications = async (userId: number) => {
  return await axios.get<API<DisplayNotificationDto[]>>(
    `notifications/user/${userId}`
  );
};

export const handleMarkReadNotification = async (id: number) => {
  return await axios.patch<API<DisplayNotificationDto>>(
    `notifications/${id}/read`
  );
};

export const handleDeleteNotification = async (id: number) => {
  return await axios.delete<API>(`notifications/${id}`);
};
