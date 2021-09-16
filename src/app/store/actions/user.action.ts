import { createAction, props } from "@ngrx/store";
import { ICaptcha, IUserProfile } from '@models';
import {
  IUserSigninRequest, IUserSignupParamsRequest, IUserSignupRequest,
  IUserResetPasswordRequest, IUserForgotPasswordRequest, IUserChangeEmailRequest, IUserUpdateProfileRequest, IUserResetEmailRequest
} from '@services';
import { IAccount } from "@djonnyx/tornado-types";

export enum UserActionTypes {
  USER_SIGNIN_REQUEST = "TORNADO/user-signin:request",
  USER_SIGNIN_SUCCESS = "TORNADO/user-signin:success",
  USER_SIGNIN_ERROR = "TORNADO/user-signin:error",

  USER_SIGNUP_REQUEST = "TORNADO/user-signup:request",
  USER_SIGNUP_SUCCESS = "TORNADO/user-signup:success",
  USER_SIGNUP_ERROR = "TORNADO/user-signup:error",

  USER_SIGNUP_PARAMS_REQUEST = "TORNADO/user-signup-params:request",
  USER_SIGNUP_PARAMS_SUCCESS = "TORNADO/user-signup-params:success",
  USER_SIGNUP_PARAMS_ERROR = "TORNADO/user-signup-params:error",

  USER_FORGOT_PASSWORD_REQUEST = "TORNADO/user-forgot-password:request",
  USER_FORGOT_PASSWORD_SUCCESS = "TORNADO/user-forgot-password:success",
  USER_FORGOT_PASSWORD_ERROR = "TORNADO/user-forgot-password:error",

  USER_RESET_PASSWORD_REQUEST = "TORNADO/user-reset-password:request",
  USER_RESET_PASSWORD_SUCCESS = "TORNADO/user-reset-password:success",
  USER_RESET_PASSWORD_ERROR = "TORNADO/user-reset-password:error",

  USER_UPDATE_PROFILE_REQUEST = "TORNADO/user-update-profile:request",
  USER_UPDATE_PROFILE_SUCCESS = "TORNADO/user-update-profile:success",
  USER_UPDATE_PROFILE_ERROR = "TORNADO/user-update-profile:error",

  USER_CHANGE_EMAIL_REQUEST = "TORNADO/user-change-email:request",
  USER_CHANGE_EMAIL_SUCCESS = "TORNADO/user-change-email:success",
  USER_CHANGE_EMAIL_ERROR = "TORNADO/user-change-email:error",

  USER_RESET_EMAIL_REQUEST = "TORNADO/user-reset-email:request",
  USER_RESET_EMAIL_SUCCESS = "TORNADO/user-reset-email:success",
  USER_RESET_EMAIL_ERROR = "TORNADO/user-reset-email:error",

  SIGNOUT_REQUEST = "TORNADO/user/signout:request",
  SIGNOUT_SUCCESS = "TORNADO/user/signout:success",
  SIGNOUT_ERROR = "TORNADO/user/signout:error",

  CLEAR_PROFILE = "TORNADO/user/signout:error",

  RESET_LOADING = "TORNADO/user/reset-loading",
}

export namespace UserActions {
  // signin
  export const userSigninRequest = createAction(
    UserActionTypes.USER_SIGNIN_REQUEST,
    props<IUserSigninRequest>()
  );
  export const userSigninSuccess = createAction(
    UserActionTypes.USER_SIGNIN_SUCCESS,
    props<{ profile: IUserProfile }>()
  );
  export const userSigninError = createAction(
    UserActionTypes.USER_SIGNIN_ERROR,
    props<{ error: string }>()
  );

  // signup request
  export const userSignupParamsRequest = createAction(
    UserActionTypes.USER_SIGNUP_PARAMS_REQUEST,
    props<IUserSignupParamsRequest>(),
  );
  export const userSignupParamsSuccess = createAction(
    UserActionTypes.USER_SIGNUP_PARAMS_SUCCESS,
    props<{ captcha: ICaptcha }>()
  );
  export const userSignupParamsError = createAction(
    UserActionTypes.USER_SIGNUP_PARAMS_ERROR,
    props<{ error: string }>()
  );

  // signup
  export const userSignupRequest = createAction(
    UserActionTypes.USER_SIGNUP_REQUEST,
    props<IUserSignupRequest>()
  );
  export const userSignupSuccess = createAction(
    UserActionTypes.USER_SIGNUP_SUCCESS,
  );
  export const userSignupError = createAction(
    UserActionTypes.USER_SIGNUP_ERROR,
    props<{ error: string }>()
  );

  // forgot password
  export const userForgotPasswordRequest = createAction(
    UserActionTypes.USER_FORGOT_PASSWORD_REQUEST,
    props<{ params: IUserForgotPasswordRequest, fromProfile: boolean }>()
  );
  export const userForgotPasswordSuccess = createAction(
    UserActionTypes.USER_FORGOT_PASSWORD_SUCCESS,
  );
  export const userForgotPasswordError = createAction(
    UserActionTypes.USER_FORGOT_PASSWORD_ERROR,
    props<{ error: string }>()
  );

  // reset password
  export const userResetPasswordRequest = createAction(
    UserActionTypes.USER_RESET_PASSWORD_REQUEST,
    props<IUserResetPasswordRequest>()
  );
  export const userResetPasswordSuccess = createAction(
    UserActionTypes.USER_RESET_PASSWORD_SUCCESS,
  );
  export const userResetPasswordError = createAction(
    UserActionTypes.USER_RESET_PASSWORD_ERROR,
    props<{ error: string }>()
  );

  // reset email
  export const userResetEmailRequest = createAction(
    UserActionTypes.USER_RESET_EMAIL_REQUEST,
    props<IUserResetEmailRequest>()
  );
  export const userResetEmailSuccess = createAction(
    UserActionTypes.USER_RESET_EMAIL_SUCCESS,
  );
  export const userResetEmailError = createAction(
    UserActionTypes.USER_RESET_EMAIL_ERROR,
    props<{ error: string }>()
  );

  // update profile
  export const userUpdateProfileRequest = createAction(
    UserActionTypes.USER_UPDATE_PROFILE_REQUEST,
    props<{ id: string, data: IAccount }>()
  );
  export const userUpdateProfileSuccess = createAction(
    UserActionTypes.USER_UPDATE_PROFILE_SUCCESS,
    props<{ account: IAccount }>()
  );
  export const userUpdateProfileError = createAction(
    UserActionTypes.USER_UPDATE_PROFILE_ERROR,
    props<{ error: string }>()
  );

  // change email
  export const userChangeEmailRequest = createAction(
    UserActionTypes.USER_CHANGE_EMAIL_REQUEST,
    props<IUserChangeEmailRequest>()
  );
  export const userChangeEmailSuccess = createAction(
    UserActionTypes.USER_CHANGE_EMAIL_SUCCESS,
  );
  export const userChangeEmailError = createAction(
    UserActionTypes.USER_CHANGE_EMAIL_ERROR,
    props<{ error: string }>()
  );

  // signout
  export const signoutRequest = createAction(
    UserActionTypes.SIGNOUT_REQUEST,
  );
  export const signoutSuccess = createAction(
    UserActionTypes.SIGNOUT_SUCCESS,
  );
  export const signoutError = createAction(
    UserActionTypes.SIGNOUT_ERROR,
    props<{ error: string }>()
  );

  // clear profile
  export const clearProfile = createAction(
    UserActionTypes.CLEAR_PROFILE,
  );

  export const resetLoading = createAction(
    UserActionTypes.RESET_LOADING,
  );
}
