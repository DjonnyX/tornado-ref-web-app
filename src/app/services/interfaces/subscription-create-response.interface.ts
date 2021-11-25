import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ISubscription } from '@djonnyx/tornado-types';

export interface ISubscriptionCreateResponse extends IBaseResponse<ISubscription, IMetaRefsResponse> {}