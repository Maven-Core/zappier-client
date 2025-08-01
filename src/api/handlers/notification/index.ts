import { DisplayNotificationDto } from "@/api/dtos/notification/display-notification.dto";
import axios from "../axios/axios-instance";

export const handleGetAllNotifications = async () => {
  return await axios.get<DisplayNotificationDto[]>(`notifications`);
};
