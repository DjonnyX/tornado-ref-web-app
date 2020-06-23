import { IUser } from '@models';
import { IBaseState } from './base';

export interface IUserState extends IBaseState, IUser {
    isSigninProgress: boolean;
    isSignupProgress: boolean;
    isResetPasswordProgress: boolean;
    isForgotPasswordProgress: boolean;
}