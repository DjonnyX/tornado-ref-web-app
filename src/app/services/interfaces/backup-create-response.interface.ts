import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IBackupClientCreateResponse extends IBaseResponse<{
    url: string;
    filename: string;
}, IMetaRefsResponse> {}