import { DisplayUserDto } from "@/api/dtos/aaa/display-user.dto";
import axios from "../axios/axios-instance";

export const handleGetAllUsers = async () => {
  return await axios.get<DisplayUserDto[]>(`users`);
};
