import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IProduct } from '@djonnyx/tornado-types';

export interface IProductAssetUpdateResponse extends IBaseResponse<{
    product: IProduct;
    asset: IAsset;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}