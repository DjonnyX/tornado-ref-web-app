import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ILicenseAccount } from '@djonnyx/tornado-types';

export interface ILicensesAccountState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUnbindProcess: boolean;
    collection: Array<ILicenseAccount> | null;
}