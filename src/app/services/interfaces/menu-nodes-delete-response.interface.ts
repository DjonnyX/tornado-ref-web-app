import { IBaseResponse } from '.';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { INode } from '@models';

export interface IMenuNodesDeleteResponse extends IBaseResponse<{
    changed: INode;
    deleted: Array<string>;
}, IMetaRefsResponse> {}