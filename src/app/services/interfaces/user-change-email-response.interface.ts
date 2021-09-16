import { IAccount } from '@djonnyx/tornado-types';
import { IBaseResponse } from './base-response.interface';

export interface IUserChangeEmailResponse extends IBaseResponse<IAccount, {}> {}