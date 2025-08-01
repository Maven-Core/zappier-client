import { DisplayTriggerDto } from "../trigger/display-trigger.dto";
import { DisplayUserDto } from "../aaa/display-user.dto";

export interface DisplayTriggerUserMapDto {
  id: number;

  trigger_id: number;

  user_id: number;

  assigned_at: Date;

  user: DisplayUserDto;

  trigger: DisplayTriggerDto;
}
