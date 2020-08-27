import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IProgress } from '@app/models/progress.model';
import { ITag } from '@djonnyx/tornado-types';

export interface ITagAssetCreateResponse extends IBaseResponse<{
    product: ITag;
    asset: IAsset;
} | {
    progress: IProgress;
}, {
    product: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}