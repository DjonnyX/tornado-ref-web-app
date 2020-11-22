import { IBaseState } from './base';
import { ILicenseType } from '@djonnyx/tornado-types';

export interface ILicenseState extends IBaseState {
    licenseType: ILicenseType;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}