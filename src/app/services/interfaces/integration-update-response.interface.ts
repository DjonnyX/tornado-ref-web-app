import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IIntegration } from '@djonnyx/tornado-types';

export interface IIntegrationUpdateResponse extends IBaseResponse<IIntegration, IMetaRefsResponse> {}