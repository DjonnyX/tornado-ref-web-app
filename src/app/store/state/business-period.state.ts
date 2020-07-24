import { IBaseState } from './base';
import { IBusinessPeriod } from '@djonnyx/tornado-types';

export interface IBusinessPeriodState extends IBaseState {
    businessPeriod: IBusinessPeriod;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}