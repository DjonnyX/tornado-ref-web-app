import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ISelector } from '@djonnyx/tornado-types';

export interface ISelectorsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ISelector> | null;
}