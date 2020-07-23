import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ISelector } from '@djonnyx/tornado-types';

export interface ISelectorsGetResponse extends IBaseResponse<Array<ISelector>, IMetaRefsResponse> {}