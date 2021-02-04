import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ILicenseAccount } from '@djonnyx/tornado-types';

export interface ILicensesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ILicenseAccount> | null;
}