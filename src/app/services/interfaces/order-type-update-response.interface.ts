import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IOrderType } from '@djonnyx/tornado-types';

export interface IOrderTypeUpdateResponse extends IBaseResponse<IOrderType, IMetaRefsResponse> {}