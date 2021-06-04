import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IProgress } from '@app/models/progress.model';
import { IAppTheme } from '@djonnyx/tornado-types';

export interface IAppThemeAssetCreateResponse extends IBaseResponse<{
    theme: IAppTheme;
    asset: IAsset;
} | {
    progress: IProgress;
}, {
    theme: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}