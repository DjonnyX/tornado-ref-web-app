import { createAction, props } from "@ngrx/store";
import { IUser } from '@models';
import { IUserSigninRequest, IUserSignupRequest, IErrorResponse } from '@services';

export enum UserActionTypes {
  USER_SIGNIN_REQUEST = "TORNADO/user-signin:request",
  USER_SIGNIN_SUCCESS = "TORNADO/user-signin:success",
  USER_SIGNIN_ERROR = "TORNADO/user-signin:error",

  USER_SIGNUP_REQUEST = "TORNADO/user-signup:request",
  USER_SIGNUP_SUCCESS = "TORNADO/user-signup:success",
  USER_SIGNUP_ERROR = "TORNADO/user-signup:error",
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
}
