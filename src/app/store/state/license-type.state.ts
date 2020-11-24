import { IBaseState } from './base';
import { ILicenseType } from '@djonnyx/tornado-types';

export interface ILicenseTypeState extends IBaseState {
    licenseType: ILicenseType;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}