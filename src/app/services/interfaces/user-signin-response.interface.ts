import { IUser } from '@models';
import { IBaseResponse } from './base-response.interface';

export interface IUserSigninResponse extends IBaseResponse<IUser, any> {}