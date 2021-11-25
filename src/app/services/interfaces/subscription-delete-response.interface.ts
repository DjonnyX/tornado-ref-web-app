import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface ISubscriptionDeleteResponse extends IBaseResponse<{}, IMetaRefsResponse> {}