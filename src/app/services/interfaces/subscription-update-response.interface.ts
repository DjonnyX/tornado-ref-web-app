import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ISubscription } from '@djonnyx/tornado-types';

export interface ISubscriptionUpdateResponse extends IBaseResponse<ISubscription, IMetaRefsResponse> {}