import { DisplayTriggerUserMapDto } from "@/api/dtos/trigger-user-map/display-trigger-user-map.dto";
import axios from "../axios/axios-instance";
import { CreateTriggerUserMapDto } from "@/api/dtos/trigger-user-map/create-trigger-user-map.dto";
import { BaseDeleteDto } from "@/api/dtos/base/base-dto";

export const handleGetAllTriggerUserMaps = async () => {
  return await axios.get<DisplayTriggerUserMapDto[]>(`trigger-user-map`);
};

export const handleCreateTriggerMap = async (body: CreateTriggerUserMapDto) => {
  return await axios.post<DisplayTriggerUserMapDto>(`trigger-user-map`, body);
};

export const handleDeleteTriggerMap = async (id: number) => {
  return await axios.delete<DisplayTriggerUserMapDto>(`trigger-user-map`, {
    params: { id },
  });
};
