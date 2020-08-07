import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { ICurrency } from '@djonnyx/tornado-types';

export interface ICurrencyUpdateResponse extends IBaseResponse<ICurrency, IMetaRefsResponse> {}