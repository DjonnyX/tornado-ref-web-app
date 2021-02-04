import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ILicenseAccount } from '@djonnyx/tornado-types';

export interface ILicensesAccountGetResponse extends IBaseResponse<Array<ILicenseAccount>, IMetaRefsResponse> {}