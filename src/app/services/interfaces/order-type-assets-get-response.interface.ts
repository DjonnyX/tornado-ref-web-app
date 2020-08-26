import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IOrderTypeAssetGetResponse extends IBaseResponse<{ [lang: string]: Array<IAsset> }, {}> { }