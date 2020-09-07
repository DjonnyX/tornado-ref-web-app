import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAd } from '@djonnyx/tornado-types';

export interface IAdsUpdateResponse extends IBaseResponse<IAd, IMetaRefsResponse> {}