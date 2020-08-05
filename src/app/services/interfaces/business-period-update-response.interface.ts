import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IBusinessPeriod } from '@djonnyx/tornado-types';

export interface IBusinessPeriodUpdateResponse extends IBaseResponse<IBusinessPeriod, IMetaRefsResponse> {}