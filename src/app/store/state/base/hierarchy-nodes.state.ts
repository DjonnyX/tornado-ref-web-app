import { IBaseState } from './base.state';
import { IMetaRefsResponse } from '@services';
import { INode } from '@djonnyx/tornado-types';

export interface IHierarchyNodesState extends IBaseState {
    meta: IMetaRefsResponse;
    isGetRootNodeProcess: boolean;
    isGetProcess: boolean;
    isCreateProcess: boolean;
    isUpdateProcess: boolean;
    isDeleteProcess: boolean;
    collection: Array<INode> | null;
}