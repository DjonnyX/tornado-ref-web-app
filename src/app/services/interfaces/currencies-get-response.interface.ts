import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ICurrency } from '@djonnyx/tornado-types';

export interface ICurrenciesGetResponse extends IBaseResponse<Array<ICurrency>, IMetaRefsResponse> {}