import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ISubscription } from '@djonnyx/tornado-types';

export interface ISubscriptionsGetResponse extends IBaseResponse<Array<ISubscription>, IMetaRefsResponse> {}