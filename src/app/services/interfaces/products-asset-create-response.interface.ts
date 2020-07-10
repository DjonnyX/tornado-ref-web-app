import { IBaseResponse } from '.';
import { IProduct } from '@app/models/product.model';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';

export interface IProductsAssetCreateResponse extends IBaseResponse<{
    product: IProduct;
    asset: IAsset;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}