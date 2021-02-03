import { IBaseResponse } from './base-response.interface';
import { IMetaRefsResponse } from './meta-refs-response.interface';
import { IAccount } from '@djonnyx/tornado-types';

export interface IAccountUpdateResponse extends IBaseResponse<IAccount, IMetaRefsResponse> {}