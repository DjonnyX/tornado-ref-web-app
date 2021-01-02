import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IApplicationDeleteResponse extends IBaseResponse<{}, IMetaRefsResponse> {}