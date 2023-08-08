import { ErrorResponse, SuccessResponse } from './response-result-type';

export const createSuccess = <T>(
  response: T,
  code = 200,
): SuccessResponse<T> => {
  return {
    status: 'success',
    response,
    code,
  };
};

export const createError = <T>(
  response: T,
  code: number,
  params?: any,
): ErrorResponse<T> => {
  return {
    status: 'error',
    response,
    code,
    params,
  };
};
