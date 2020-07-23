import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { ITag } from '@djonnyx/tornado-types';

export interface ITagsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ITag> | null;
}