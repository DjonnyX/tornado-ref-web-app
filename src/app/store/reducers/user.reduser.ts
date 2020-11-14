import { createReducer, on } from '@ngrx/store';
import { IUserState } from '@store/state/user.state';
import { UserActions } from '@store/actions/user.action';

export const initialState: IUserState = {
  loading: false,
  isSigninProgress: false,
  isSignupParamsProgress: false,
  isSignupProgress: false,
  isSignoutProgress: false,
  isForgotPasswordProgress: false,
  isResetPasswordProgress: false,
  error: undefined,
  profile: undefined,
  captcha: undefined,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.clearProfile, state => {
    return {
      ...state,
      profile: undefined,
    };
  }),
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
  on(UserActions.userSignupParamsRequest, state => {
    return {
      ...state,
      loading: true,
      isSignupParamsProgress: true,
    };
  }),
  on(UserActions.signoutRequest, state => {
    return {
      ...state,
      loading: true,
      isSignoutProgress: true,
    };
  }),
  on(UserActions.userForgotPasswordRequest, state => {
    return {
      ...state,
      loading: true,
      isForgotPasswordProgress: true,
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
      profile: undefined,
      loading: false,
      isSigninProgress: false,
    };
  }),
  on(UserActions.userSignupParamsError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isSignupParamsProgress: false,
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
  on(UserActions.signoutError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isSignoutProgress: false,
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
  on(UserActions.userForgotPasswordError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isForgotPasswordProgress: false,
    };
  }),
  on(UserActions.userSigninSuccess, (state, { profile }) => {
    return {
      ...state,
      profile,
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
  on(UserActions.userSignupParamsSuccess, (state, { captcha }) => {
    return {
      ...state,
      error: undefined,
      loading: false,
      isSignupParamsProgress: false,
      captcha,
    };
  }),
  on(UserActions.signoutSuccess, (state) => {
    return {
      ...state,
      error: undefined,
      loading: false,
      isSignoutProgress: false,
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
  on(UserActions.userForgotPasswordSuccess, (state) => {
    return {
      ...state,
      error: undefined,
      loading: false,
      isForgotPasswordProgress: false,
    };
  }),
);

export default userReducer;
