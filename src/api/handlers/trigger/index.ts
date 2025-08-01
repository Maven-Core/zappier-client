import { DisplayTriggerDto } from "@/api/dtos/trigger/display-trigger.dto";
import axios from "../axios/axios-instance";

export const handleGetAllTriggers = async () => {
  return await axios.get<DisplayTriggerDto[]>(`triggers`);
};
