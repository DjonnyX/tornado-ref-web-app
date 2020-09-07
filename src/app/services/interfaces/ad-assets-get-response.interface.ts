import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IAdAssetGetResponse extends IBaseResponse<{ [lang: string]: Array<IAsset> }, {}> { }