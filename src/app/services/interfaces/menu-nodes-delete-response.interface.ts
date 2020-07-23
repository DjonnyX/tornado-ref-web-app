import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { INode } from '@djonnyx/tornado-types';

export interface IMenuNodesDeleteResponse extends IBaseResponse<{
    changed: INode;
    deleted: Array<string>;
}, IMetaRefsResponse> {}