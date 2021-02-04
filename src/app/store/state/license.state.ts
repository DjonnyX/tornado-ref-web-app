import { IBaseState } from './base';
import { ILicenseAccount } from '@djonnyx/tornado-types';

export interface ILicenseState extends IBaseState {
    license: ILicenseAccount;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}