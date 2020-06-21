import { createAction, props } from "@ngrx/store";
import { IUser } from '@models';
import { IUserAuthRequest, IUserRegistrationRequest } from '@services';

export enum UserActionTypes {
  USER_AUTH_REQUEST = "TORNADO/user-auth:request",
  USER_AUTH_SUCCESS = "TORNADO/user-auth:success",
  USER_AUTH_ERROR = "TORNADO/user-auth:error",

  USER_REGISTRATION_REQUEST = "TORNADO/user-registration:request",
  USER_REGISTRATION_SUCCESS = "TORNADO/user-registration:success",
  USER_REGISTRATION_ERROR = "TORNADO/user-registration:error",
}

export namespace UserActions {
  // auth
  export const userAuthRequest = createAction(
    UserActionTypes.USER_AUTH_REQUEST,
    props<IUserAuthRequest>()
  );
  export const userAuthSuccess = createAction(
    UserActionTypes.USER_AUTH_SUCCESS,
    props<{ user: IUser }>()
  );
  export const userAuthError = createAction(
    UserActionTypes.USER_AUTH_ERROR,
    props<{ error: string[] }>()
  );

  // registration
  export const userRegistrationRequest = createAction(
    UserActionTypes.USER_REGISTRATION_REQUEST,
    props<IUserRegistrationRequest>()
  );
  export const userRegistrationSuccess = createAction(
    UserActionTypes.USER_REGISTRATION_SUCCESS,
    props<{ user: IUser }>()
  );
  export const userRegistrationError = createAction(
    UserActionTypes.USER_REGISTRATION_ERROR,
    props<{ error: string[] }>()
  );
}
