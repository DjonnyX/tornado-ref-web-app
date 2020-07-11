import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAsset } from '@models';

export interface IAssetsUpdateResponse extends IBaseResponse<IAsset, IMetaRefsResponse> {}