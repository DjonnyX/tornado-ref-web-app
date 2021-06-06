import { IAsset } from '@models';
import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IAppThemeAssetDeleteResponse extends IBaseResponse<{ asset: IAsset }, {
    asset: IMetaRefsResponse;
}> { }