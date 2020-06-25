import { IUserProfile } from '@models';
import { IBaseState } from './base';

export interface IUserState extends IBaseState {
    isSigninProgress: boolean;
    isSignupProgress: boolean;
    isResetPasswordProgress: boolean;
    isForgotPasswordProgress: boolean;
    profile: IUserProfile;
}