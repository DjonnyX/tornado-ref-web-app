import { createAction, props } from "@ngrx/store";
import { IUser } from '@models';
import {
  IUserSigninRequest, IUserSignupRequest, IErrorResponse,
  IUserResetPasswordRequest, IUserForgotPasswordRequest
} from '@services';

export enum UserActionTypes {
  USER_SIGNIN_REQUEST = "TORNADO/user-signin:request",
  USER_SIGNIN_SUCCESS = "TORNADO/user-signin:success",
  USER_SIGNIN_ERROR = "TORNADO/user-signin:error",

  USER_SIGNUP_REQUEST = "TORNADO/user-signup:request",
  USER_SIGNUP_SUCCESS = "TORNADO/user-signup:success",
  USER_SIGNUP_ERROR = "TORNADO/user-signup:error",

  USER_FORGOT_PASSWORD_REQUEST = "TORNADO/user-forgot-password:request",
  USER_FORGOT_PASSWORD_SUCCESS = "TORNADO/user-forgot-password:success",
  USER_FORGOT_PASSWORD_ERROR = "TORNADO/user-forgot-password:error",

  USER_RESET_PASSWORD_REQUEST = "TORNADO/user-reset-password:request",
  USER_RESET_PASSWORD_SUCCESS = "TORNADO/user-reset-password:success",
  USER_RESET_PASSWORD_ERROR = "TORNADO/user-reset-password:error",
}

export namespace UserActions {
  // signin
  export const userSigninRequest = createAction(
    UserActionTypes.USER_SIGNIN_REQUEST,
    props<IUserSigninRequest>()
  );
  export const userSigninSuccess = createAction(
    UserActionTypes.USER_SIGNIN_SUCCESS,
    props<{ user: IUser }>()
  );
  export const userSigninError = createAction(
    UserActionTypes.USER_SIGNIN_ERROR,
    props<{ error: IErrorResponse }>()
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
    props<{ error: IErrorResponse }>()
  );

  // forgot password
  export const userForgotPasswordRequest = createAction(
    UserActionTypes.USER_FORGOT_PASSWORD_REQUEST,
    props<IUserForgotPasswordRequest>()
  );
  export const userForgotPasswordSuccess = createAction(
    UserActionTypes.USER_FORGOT_PASSWORD_SUCCESS,
  );
  export const userForgotPasswordError = createAction(
    UserActionTypes.USER_FORGOT_PASSWORD_ERROR,
    props<{ error: IErrorResponse }>()
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
    props<{ error: IErrorResponse }>()
  );
}
