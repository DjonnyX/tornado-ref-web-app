import { IBaseResponse } from './base-response.interface';
import { ILicense } from '@djonnyx/tornado-types';

export interface ILicenseGetResponse extends IBaseResponse<ILicense, {}> {}