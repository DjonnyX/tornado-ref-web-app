import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ICurrency } from '@djonnyx/tornado-types';

export interface ICurrencyCreateResponse extends IBaseResponse<ICurrency, IMetaRefsResponse> {}