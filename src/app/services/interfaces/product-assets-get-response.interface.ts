import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IProductAssetGetResponse extends IBaseResponse<Array<IAsset>, {}> { }