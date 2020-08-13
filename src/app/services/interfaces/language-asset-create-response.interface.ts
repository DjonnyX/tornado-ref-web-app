import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IProgress } from '@app/models/progress.model';
import { ILanguage } from '@djonnyx/tornado-types';

export interface ILanguageAssetCreateResponse extends IBaseResponse<{
    product: ILanguage;
    asset: IAsset;
} | {
    progress: IProgress;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}