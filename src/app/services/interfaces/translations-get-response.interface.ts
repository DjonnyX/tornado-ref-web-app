import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ITranslation } from '@djonnyx/tornado-types';

export interface ITranslationsGetResponse extends IBaseResponse<Array<ITranslation>, IMetaRefsResponse> {}