import { IBaseResponse } from './base-response.interface';
import { IAsset } from '@models';

export interface IAppThemeAssetGetResponse extends IBaseResponse<Array<IAsset>, {}> { }