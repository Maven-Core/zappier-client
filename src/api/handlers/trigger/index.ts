import { DisplayTriggerDto } from "@/api/dtos/trigger/display-trigger.dto";
import axios from "../axios/axios-instance";
import { API } from "@/api/dtos/base/api-response-dto";
import { CreateTriggerDto } from "@/api/dtos/trigger/create-trigger.dto";

export const handleGetAllTriggers = async () => {
  return await axios.get<API<DisplayTriggerDto[]>>(`triggers`);
};

export const handleCreateTrigger = async (data: CreateTriggerDto) => {
  return await axios.post<API<DisplayTriggerDto>>(`triggers`, data);
};

export const handleRunTriggers = async () => {
  return await axios.post<API>(`triggers/run`);
};
