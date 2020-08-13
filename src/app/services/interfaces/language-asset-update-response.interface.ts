import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { ILanguage } from '@djonnyx/tornado-types';

export interface ILanguageAssetUpdateResponse extends IBaseResponse<{
    product: ILanguage;
    asset: IAsset;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}