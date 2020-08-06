import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface ISelectorAssetGetResponse extends IBaseResponse<Array<IAsset>, {}> { }