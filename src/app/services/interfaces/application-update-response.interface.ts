import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IApplication } from '@djonnyx/tornado-types';

export interface IApplicationUpdateResponse extends IBaseResponse<IApplication, IMetaRefsResponse> {}