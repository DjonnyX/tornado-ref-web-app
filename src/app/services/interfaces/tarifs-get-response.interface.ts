import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ITarif } from '@djonnyx/tornado-types';

export interface ITarifsGetResponse extends IBaseResponse<Array<ITarif>, IMetaRefsResponse> {}