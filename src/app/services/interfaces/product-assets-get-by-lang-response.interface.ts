import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IProductAssetGetByLangResponse extends IBaseResponse<Array<IAsset>, {}> { }