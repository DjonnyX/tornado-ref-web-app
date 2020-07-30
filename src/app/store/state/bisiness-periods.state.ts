import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IBusinessPeriod } from '@djonnyx/tornado-types';

export interface IBusinessPeriodsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IBusinessPeriod> | null;
}