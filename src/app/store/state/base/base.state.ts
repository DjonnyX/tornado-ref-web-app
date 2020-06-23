import { IErrorResponse } from '@services';

export interface IBaseState {
    loading: boolean;
    error: IErrorResponse;
}