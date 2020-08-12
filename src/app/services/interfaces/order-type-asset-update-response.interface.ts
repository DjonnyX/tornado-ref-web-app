import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IOrderType } from '@djonnyx/tornado-types';

export interface IOrderTypeAssetUpdateResponse extends IBaseResponse<{
    product: IOrderType;
    asset: IAsset;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}