import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IApplication } from '@djonnyx/tornado-types';

export interface IApplicationCreateResponse extends IBaseResponse<IApplication, IMetaRefsResponse> {}