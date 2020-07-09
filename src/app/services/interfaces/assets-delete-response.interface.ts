import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IAssetsDeleteResponse extends IBaseResponse<{}, IMetaRefsResponse> {}