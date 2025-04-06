type SuccessResponse<T> = {
  success: true;
  data: T | null;
};

export type ErrorResponse = {
  success: false;
  error: string;
  errorCode?: number;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
