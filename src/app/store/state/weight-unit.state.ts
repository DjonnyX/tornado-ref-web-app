import { IBaseState } from './base';
import { IWeightUnit } from '@djonnyx/tornado-types';

export interface IWeightUnitState extends IBaseState {
    weightUnit: IWeightUnit;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}