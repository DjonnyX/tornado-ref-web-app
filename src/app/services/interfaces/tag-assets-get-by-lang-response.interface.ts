import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface ITagAssetGetByLangResponse extends IBaseResponse<Array<IAsset>, {}> { }