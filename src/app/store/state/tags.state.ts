import { IBaseState } from './base';
import { ITag } from '@app/models/tag.model';
import { IMetaRefsResponse } from '@services';

export interface ITagsState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<ITag> | null;
    newTag: ITag | null;
    editTag: ITag | null;
}