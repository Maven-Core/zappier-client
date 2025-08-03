import { DisplayTriggerUserMapDto } from "@/api/dtos/trigger-user-map/display-trigger-user-map.dto";
import axios from "../axios/axios-instance";
import { CreateTriggerUserMapDto } from "@/api/dtos/trigger-user-map/create-trigger-user-map.dto";
import { API, ApiResponseDto } from "@/api/dtos/base/api-response-dto";

export const handleGetAllTriggerUserMaps = async () => {
  return await axios.get<API<DisplayTriggerUserMapDto[]>>(`trigger-user-map`);
};

export const handleCreateTriggerMap = async (body: CreateTriggerUserMapDto) => {
  return await axios.post<API<DisplayTriggerUserMapDto>>(
    `trigger-user-map`,
    body
  );
};

export const handleDeleteTriggerMap = async (
  id: number
): Promise<ApiResponseDto> => {
  return (await axios.delete<API>(`trigger-user-map/${id}`)).data;
};
