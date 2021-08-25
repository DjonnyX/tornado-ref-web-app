import { IEntityPosition } from '@djonnyx/tornado-types';
import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IEntityPositionsResponse extends IBaseResponse<Array<IEntityPosition>, IMetaRefsResponse> { }