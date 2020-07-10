import { IBaseResponse } from '.';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IProductsAssetDeleteResponse extends IBaseResponse<{}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}