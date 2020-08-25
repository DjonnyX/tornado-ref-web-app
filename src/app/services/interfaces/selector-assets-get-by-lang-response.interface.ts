import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface ISelectorAssetGetByLangResponse extends IBaseResponse<Array<IAsset>, {}> { }