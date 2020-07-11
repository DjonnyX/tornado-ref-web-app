import { IBaseState } from './base';
import { ITag } from '@models';

export interface ITagState extends IBaseState {
    tag: ITag;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}