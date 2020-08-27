import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface ITagAssetDeleteResponse extends IBaseResponse<{}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}