import { IBaseState } from './base';
import { ILicense } from '@djonnyx/tornado-types';

export interface ILicenseState extends IBaseState {
    license: ILicense;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}