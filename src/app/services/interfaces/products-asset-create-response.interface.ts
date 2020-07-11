import { IBaseResponse } from './base-response.interface';
import { IProduct } from '@app/models/product.model';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IProgress } from '@app/models/progress.model';

export interface IProductsAssetCreateResponse extends IBaseResponse<{
    product: IProduct;
    asset: IAsset;
} | {
    progress: IProgress;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}