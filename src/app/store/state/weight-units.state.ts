import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IWeightUnit } from '@djonnyx/tornado-types';

export interface IWeightUnitsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IWeightUnit> | null;
}