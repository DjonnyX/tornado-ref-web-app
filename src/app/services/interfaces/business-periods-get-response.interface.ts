import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IBusinessPeriod } from '@djonnyx/tornado-types';

export interface IBusinessPeriodsGetResponse extends IBaseResponse<Array<IBusinessPeriod>, IMetaRefsResponse> {}