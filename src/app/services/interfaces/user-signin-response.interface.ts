import { IUserProfile } from '@models';
import { IBaseResponse } from './base-response.interface';

export interface IUserSigninResponse extends IBaseResponse<IUserProfile, any> {}