import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IOrderTypeAssetDeleteResponse extends IBaseResponse<{}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}