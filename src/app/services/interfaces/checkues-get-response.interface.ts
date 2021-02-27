import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ICheckue } from '@djonnyx/tornado-types';

export interface ICheckuesGetResponse extends IBaseResponse<Array<ICheckue>, IMetaRefsResponse> {}