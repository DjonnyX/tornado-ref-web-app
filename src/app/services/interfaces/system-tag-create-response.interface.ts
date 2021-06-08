import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ISystemTag } from '@djonnyx/tornado-types';

export interface ISystemTagCreateResponse extends IBaseResponse<ISystemTag, IMetaRefsResponse> {}