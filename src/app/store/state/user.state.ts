import { IUser } from '@models';
import { IBaseState } from './base';

export interface IUserState extends IBaseState, IUser {
    logged: boolean;
}