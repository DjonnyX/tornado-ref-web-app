import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IRefServerInfo } from '@djonnyx/tornado-types';

export interface IRefServerInfoGetResponse extends IBaseResponse<IRefServerInfo, IMetaRefsResponse> { }