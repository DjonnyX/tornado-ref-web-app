import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ICurrency } from '@djonnyx/tornado-types';

export interface ICurrenciesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ICurrency> | null;
}