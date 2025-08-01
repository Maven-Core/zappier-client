import { DisplayUserDto } from "../aaa/display-user.dto";
import { DisplayTriggerUserMapDto } from "../trigger-user-map/display-trigger-user-map.dto";
import { DisplayNotificationDto } from "../notification/display-notification.dto";

export interface DisplayTriggerDto {
  id: number;

  name: string;

  external_id: string;

  created_by: number;

  created_at: Date;

  creator?: DisplayUserDto;

  userMaps?: DisplayTriggerUserMapDto[];

  notifications?: DisplayNotificationDto[];
}
