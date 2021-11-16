import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IWeightUnit } from '@djonnyx/tornado-types';

export interface IWeightUnitUpdateResponse extends IBaseResponse<IWeightUnit, IMetaRefsResponse> {}