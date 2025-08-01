// src/trigger-user-map/dto/create-trigger-user-map.dto.ts

export interface CreateTriggerUserMapDto {
  trigger_id: number;

  user_id: number;

  assigned_at?: Date;
}
