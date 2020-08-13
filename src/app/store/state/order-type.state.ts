import { IBaseState } from './base';
import { IOrderType } from '@djonnyx/tornado-types';

export interface IOrderTypeState extends IBaseState {
    orderType: IOrderType;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}