export interface ApiResponseDto<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  statusCode?: number;
}

export type API<T = any> = ApiResponseDto<T>;
