import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ICheckue } from '@djonnyx/tornado-types';

export interface ICheckueCreateResponse extends IBaseResponse<ICheckue, IMetaRefsResponse> {}