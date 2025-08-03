import { DisplayUserDto } from "@/api/dtos/aaa/display-user.dto";
import axios from "../axios/axios-instance";
import { API } from "@/api/dtos/base/api-response-dto";
import {
  BackDoorLoginDto,
  DisplayLoginDto,
  LoginDto,
} from "@/api/dtos/aaa/login.dto";

export const handleGetAllUsers = async () => {
  return await axios.get<API<DisplayUserDto[]>>(`users`);
};

export const handleLoginUser = async (loginDto: LoginDto) => {
  return await axios.post<API<DisplayLoginDto>>("auth/login", loginDto);
};

export const handleBackdoorLoginUser = async (loginDto: BackDoorLoginDto) => {
  return await axios.post<API<DisplayLoginDto>>(
    "auth/login-backdoor",
    loginDto
  );
};

export const handleLogOutUser = async () => {
  return await axios.post<API<DisplayLoginDto>>("auth/logout");
};

export const handleGetMe = async () => {
  return await axios.get<DisplayUserDto>(`users/me`);
};
