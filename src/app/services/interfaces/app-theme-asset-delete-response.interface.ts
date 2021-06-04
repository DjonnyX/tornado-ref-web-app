import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IAppThemeAssetDeleteResponse extends IBaseResponse<{}, {
    theme: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}