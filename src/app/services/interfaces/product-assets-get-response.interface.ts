import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IProductAssetGetResponse extends IBaseResponse<{ [lang: string]: Array<IAsset> }, {}> { }