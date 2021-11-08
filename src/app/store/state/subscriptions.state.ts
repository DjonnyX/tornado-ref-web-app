import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ISubscription } from '@djonnyx/tornado-types';

export interface ISubscriptionsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ISubscription> | null;
}