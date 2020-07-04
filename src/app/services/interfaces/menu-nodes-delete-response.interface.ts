import { IBaseResponse } from '.';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IMenuNodesDeleteResponse extends IBaseResponse<Array<string>, IMetaRefsResponse> {}