import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IAccount } from '@djonnyx/tornado-types';

export interface IAccountsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IAccount> | null;
}