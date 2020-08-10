import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IOrderType } from '@djonnyx/tornado-types';

export interface IOrderTypesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IOrderType> | null;
}