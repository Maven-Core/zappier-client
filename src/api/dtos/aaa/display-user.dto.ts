// user.dto.ts
import { DisplayTriggerDto } from "../trigger/display-trigger.dto";
import { DisplayNotificationDto } from "../notification/display-notification.dto";
import { DisplayTriggerUserMapDto } from "../trigger-user-map/display-trigger-user-map.dto";

export interface DisplayUserDto {
  id: number;

  created_at: Date;

  name: string;

  username: string;

  role: string;

  triggers: DisplayTriggerDto[];

  notifications: DisplayNotificationDto[];

  triggerMap: DisplayTriggerUserMapDto[];
}
