import { IErrorResponse } from './error-response.interface';

export interface IBaseResponse<T, M> {
    meta: M;
    error: IErrorResponse | Error | string;
    data: T;
}