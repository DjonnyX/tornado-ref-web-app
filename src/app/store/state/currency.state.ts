import { IBaseState } from './base';
import { ICurrency } from '@djonnyx/tornado-types';

export interface ICurrencyState extends IBaseState {
    currency: ICurrency;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}