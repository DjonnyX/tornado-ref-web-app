import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { IStore } from '@djonnyx/tornado-types';

export interface IStoresState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<IStore> | null;
}