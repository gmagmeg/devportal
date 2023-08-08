export type ResponseResultStatus = 'success' | 'error';

export type SuccessResponse<T> = {
  status: 'success';
  response: T;
  code: number;
};

export type ErrorResponse<T> = {
  status: 'error';
  response: T;
  code: number;
  params?: any;
};
