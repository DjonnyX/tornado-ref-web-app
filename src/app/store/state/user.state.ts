import { ICaptcha, IUserProfile } from '@models';
import { IBaseState } from './base';

export interface IUserState extends IBaseState {
    isSigninProgress: boolean;
    isSignupParamsProgress: boolean;
    isSignupProgress: boolean;
    isResetPasswordProgress: boolean;
    isForgotPasswordProgress: boolean;
    isChangeEmailProgress: boolean;
    isResetEmailProgress: boolean;
    isUpdateProfileProgress: boolean;
    isSignoutProgress: boolean;
    profile: IUserProfile;
    captcha: ICaptcha;
}