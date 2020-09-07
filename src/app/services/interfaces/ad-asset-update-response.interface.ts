import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IAd } from '@djonnyx/tornado-types';

export interface IAdAssetUpdateResponse extends IBaseResponse<{
    ad: IAd;
    asset: IAsset;
}, {
    ad: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}