import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IProgress } from '@app/models/progress.model';
import { IOrderType } from '@djonnyx/tornado-types';

export interface IOrderTypeAssetCreateResponse extends IBaseResponse<{
    product: IOrderType;
    asset: IAsset;
} | {
    progress: IProgress;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}