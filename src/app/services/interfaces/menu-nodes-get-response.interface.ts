import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { INode } from '@models';

export interface IMenuNodesGetResponse extends IBaseResponse<Array<INode>, IMetaRefsResponse> {}