import { IBaseState } from './base';
import { IAccount } from '@djonnyx/tornado-types';

export interface IAccountState extends IBaseState {
    account: IAccount;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}