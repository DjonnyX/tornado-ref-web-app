import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface ITagAssetGetResponse extends IBaseResponse<{ [lang: string]: Array<IAsset> }, {}> { }