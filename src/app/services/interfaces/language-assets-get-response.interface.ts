import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface ILanguageAssetGetResponse extends IBaseResponse<Array<IAsset>, {}> { }