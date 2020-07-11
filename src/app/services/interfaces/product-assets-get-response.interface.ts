import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IProductsAssetGetResponse extends IBaseResponse<Array<IAsset>, {}> { }