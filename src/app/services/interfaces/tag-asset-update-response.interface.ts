import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { ITag } from '@djonnyx/tornado-types';

export interface ITagAssetUpdateResponse extends IBaseResponse<{
    product: ITag;
    asset: IAsset;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}