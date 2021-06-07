import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ISystemTag } from '@djonnyx/tornado-types';

export interface ISystemTagsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ISystemTag> | null;
}