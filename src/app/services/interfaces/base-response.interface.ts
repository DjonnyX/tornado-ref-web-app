import { IErrorResponse } from './error-response.interface';

export interface IBaseResponse<T, M> {
    meta: M;
    error: IErrorResponse;
    data: T;
}