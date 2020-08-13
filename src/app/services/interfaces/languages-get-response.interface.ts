import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ILanguage } from '@djonnyx/tornado-types';

export interface ILanguagesGetResponse extends IBaseResponse<Array<ILanguage>, IMetaRefsResponse> {}