import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IAppTheme } from '@djonnyx/tornado-types';

export interface IAppThemeAssetUpdateResponse extends IBaseResponse<{
    theme: IAppTheme;
    asset: IAsset;
}, {
    theme: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}