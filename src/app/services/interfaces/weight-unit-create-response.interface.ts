import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IWeightUnit } from '@djonnyx/tornado-types';

export interface IWeightUnitCreateResponse extends IBaseResponse<IWeightUnit, IMetaRefsResponse> {}