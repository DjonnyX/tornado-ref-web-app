import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface ILanguageAssetGetByLangResponse extends IBaseResponse<Array<IAsset>, {}> { }