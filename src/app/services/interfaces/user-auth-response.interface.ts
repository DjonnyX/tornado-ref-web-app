import { IUser } from '@models';
import { IBaseResponse } from './base-response.interface';

export interface IUserAuthResponse extends IBaseResponse<IUser> {}