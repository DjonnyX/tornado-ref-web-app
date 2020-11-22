import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ILicenseType } from '@djonnyx/tornado-types';

export interface ILicenseTypeUpdateResponse extends IBaseResponse<ILicenseType, IMetaRefsResponse> {}