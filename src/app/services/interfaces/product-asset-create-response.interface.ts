import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IProgress } from '@app/models/progress.model';
import { IProduct } from '@djonnyx/tornado-types';

export interface IProductAssetCreateResponse extends IBaseResponse<{
    product: IProduct;
    asset: IAsset;
} | {
    progress: IProgress;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}