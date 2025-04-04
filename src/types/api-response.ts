type SuccessResponse<T> = {
  success: true;
  data: T | null;
};

type ErrorResponse = {
  success: false;
  error: string;
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;
