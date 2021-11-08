import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface ISubscriptionActivateNextPeriodResponse extends IBaseResponse<{
    extra?: {
        [key: string]: any;
    } | null;
}, IMetaRefsResponse> {}