import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ILicenseType } from '@djonnyx/tornado-types';

export interface ILicenseTypesGetResponse extends IBaseResponse<Array<ILicenseType>, IMetaRefsResponse> {}