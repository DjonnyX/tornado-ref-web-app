import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { INode } from '@models';

export interface IMenuNodesCreateResponse extends IBaseResponse<{
    parent: INode,
    child: INode,
}, IMetaRefsResponse> {}