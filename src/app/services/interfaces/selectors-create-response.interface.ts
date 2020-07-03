import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ISelector } from '@models';

export interface ISelectorsCreateResponse extends IBaseResponse<ISelector, IMetaRefsResponse> {}