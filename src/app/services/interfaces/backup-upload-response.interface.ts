import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IBackupClientUploadResponse extends IBaseResponse<{
    progress: number;
    total: number;
    loaded: number;
}, IMetaRefsResponse> {}