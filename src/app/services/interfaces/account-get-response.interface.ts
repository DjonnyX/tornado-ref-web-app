import { IBaseResponse } from './base-response.interface';
import { IAccount } from '@djonnyx/tornado-types';
import { IMetaRefsResponse } from './meta-refs-response.interface';

export interface IAccountGetResponse extends IBaseResponse<IAccount, IMetaRefsResponse> {}