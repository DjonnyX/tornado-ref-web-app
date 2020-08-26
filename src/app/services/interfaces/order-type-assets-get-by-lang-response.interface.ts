import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IOrderTypeAssetGetByLangResponse extends IBaseResponse<Array<IAsset>, {}> { }