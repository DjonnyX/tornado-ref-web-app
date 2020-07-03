import { IBaseState } from './base';
import { IMetaRefsResponse } from '@services';
import { INode } from '@models';

export interface IMenuNodesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<INode> | null;
}