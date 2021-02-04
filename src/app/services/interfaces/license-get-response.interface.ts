import { IBaseResponse } from './base-response.interface';
import { ILicenseAccount } from '@djonnyx/tornado-types';

export interface ILicenseGetResponse extends IBaseResponse<ILicenseAccount, {}> {}