import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';
import { ISelector } from '@djonnyx/tornado-types';

export interface ISelectorAssetUpdateResponse extends IBaseResponse<{
    selector: ISelector;
    asset: IAsset;
}, {
    selector: IMetaRefsResponse;
    asset: IMetaRefsResponse;
}> {}