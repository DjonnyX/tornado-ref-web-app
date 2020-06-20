import { IErrorResponse } from './error-response.interface';

export interface IBaseResponse<T> {
    error: IErrorResponse;
    data: T;
}