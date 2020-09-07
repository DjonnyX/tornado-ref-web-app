import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IAdAssetGetByLangResponse extends IBaseResponse<Array<IAsset>, {}> { }