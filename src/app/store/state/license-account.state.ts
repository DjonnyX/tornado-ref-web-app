import { IBaseState } from './base';
import { ILicenseAccount } from '@djonnyx/tornado-types';

export interface ILicenseAccountState extends IBaseState {
    license: ILicenseAccount;
    isGetProcess: boolean;
}