import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IAd } from '@djonnyx/tornado-types';

export interface IAdsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IAd> | null;
}