import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { INode } from '@djonnyx/tornado-types';

export interface IMenuNodesCreateMultiResponse extends IBaseResponse<{
    changed: Array<INode>,
    created: Array<INode>,
}, IMetaRefsResponse> {}