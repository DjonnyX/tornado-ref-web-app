import { createReducer, on } from '@ngrx/store';
import { IUserState } from '@store/state/user.state';
import { UserActions } from '@store/actions/user.action';

export const initialState: IUserState = {
  loading: false,
  isSigninProgress: false,
  isSignupProgress: false,
  isForgotPasswordProgress: false,
  isResetPasswordProgress: false,
  error: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.userSigninRequest, state => {
    return {
      ...state,
      loading: true,
      isSigninProgress: true,
    };
  }),
  on(UserActions.userSignupRequest, state => {
    return {
      ...state,
      loading: true,
      isSignupProgress: true,
    };
  }),
  on(UserActions.userForgotPasswordRequest, state => {
    return {
      ...state,
      loading: true,
      isResetPasswordProgress: true,
    };
  }),
  on(UserActions.userResetPasswordRequest, state => {
    return {
      ...state,
      loading: true,
      isResetPasswordProgress: true,
    };
  }),
  on(UserActions.userSigninError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isSigninProgress: false,
    };
  }),
  on(UserActions.userSignupError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isSignupProgress: false,
    };
  }),
  on(UserActions.userResetPasswordError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isResetPasswordProgress: false,
    };
  }),
  on(UserActions.userSigninSuccess, (state, { user }) => {
    return {
      ...state,
      ...user,
      error: undefined,
      loading: false,
      isSigninProgress: false,
    };
  }),
  on(UserActions.userSignupSuccess, (state) => {
    return {
      ...state,
      error: undefined,
      loading: false,
      isSignupProgress: false,
    };
  }),
  on(UserActions.userResetPasswordSuccess, (state) => {
    return {
      ...state,
      error: undefined,
      loading: false,
      isResetPasswordProgress: false,
    };
  }),
);

export default userReducer;
