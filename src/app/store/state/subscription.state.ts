import { IBaseState } from './base';
import { ISubscription } from '@djonnyx/tornado-types';

export interface ISubscriptionState extends IBaseState {
    subscription: ISubscription;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}