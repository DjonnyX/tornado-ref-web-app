import { IBaseState } from './base';
import { ITag } from '@djonnyx/tornado-types';

export interface ITagState extends IBaseState {
    tag: ITag;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
}