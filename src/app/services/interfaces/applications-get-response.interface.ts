import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IApplication } from '@djonnyx/tornado-types';

export interface IApplicationsGetResponse extends IBaseResponse<Array<IApplication>, IMetaRefsResponse> {}