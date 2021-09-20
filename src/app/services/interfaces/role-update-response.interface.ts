import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IRole } from '@djonnyx/tornado-types';

export interface IRoleUpdateResponse extends IBaseResponse<IRole, IMetaRefsResponse> {}