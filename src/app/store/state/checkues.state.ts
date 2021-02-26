import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ICheckue } from '@djonnyx/tornado-types';

export interface ICheckuesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ICheckue> | null;
}