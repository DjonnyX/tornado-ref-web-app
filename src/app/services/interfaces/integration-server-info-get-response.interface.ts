import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IIntegrationServerInfo } from '@djonnyx/tornado-types';

export interface IIntegrationServerInfoGetResponse extends IBaseResponse<IIntegrationServerInfo, IMetaRefsResponse> { }