import { IBaseResponse } from './base-response.interface';
import { IAccount } from '@djonnyx/tornado-types';

export interface IAccountGetResponse extends IBaseResponse<IAccount, {}> {}