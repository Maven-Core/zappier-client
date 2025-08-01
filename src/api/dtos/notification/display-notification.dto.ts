import { DisplayUserDto } from "../aaa/display-user.dto";
import { DisplayTriggerDto } from "../trigger/display-trigger.dto";

export interface DisplayNotificationDto {
  id: number;

  user_id: number;

  trigger_id: number;

  message: string;

  metadata?: any; // Or `Record<string, any>` if you want stricter typing

  is_read: boolean;

  created_at: Date;

  user: DisplayUserDto;

  trigger: DisplayTriggerDto;
}
