import { DisplayUserDto } from "./display-user.dto";

export interface LoginDto {
  username: string;

  password: string;
}

export interface BackDoorLoginDto {
  username: string;
}

export interface DisplayLoginDto {
  user: DisplayUserDto;
  access_token: string;
}
