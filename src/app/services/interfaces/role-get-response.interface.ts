import { IBaseResponse } from './base-response.interface';
import { IRole } from '@djonnyx/tornado-types';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IRoleGetResponse extends IBaseResponse<IRole, IMetaRefsResponse> {}