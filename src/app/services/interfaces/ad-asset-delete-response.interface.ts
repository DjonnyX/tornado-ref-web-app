import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IAdAssetDeleteResponse extends IBaseResponse<{}, {
    ad: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}