import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { IProgress } from '@app/models/progress.model';
import { IAd } from '@djonnyx/tornado-types';

export interface IAdAssetCreateResponse extends IBaseResponse<{
    ad: IAd;
    asset: IAsset;
} | {
    progress: IProgress;
}, {
    ad: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}