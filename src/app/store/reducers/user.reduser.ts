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
  isChangeEmailProgress: false,
  isResetEmailProgress: false,
  isUpdateProfileProgress: false,
  isResetPasswordProgress: false,
  error: undefined,
  profile: undefined,
  captcha: undefined,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.resetLoading, state => {
    return {
      ...state,
      loading: false,
      isSigninProgress: false,
      isSignupParamsProgress: false,
      isSignupProgress: false,
      isSignoutProgress: false,
      isForgotPasswordProgress: false,
      isResetPasswordProgress: false,
      isChangeEmailProgress: false,
      isUpdateProfileProgress: false,
    };
  }),
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
  on(UserActions.userChangeEmailRequest, state => {
    return {
      ...state,
      loading: true,
      isChangeEmailProgress: true,
    };
  }),
  on(UserActions.userResetEmailRequest, state => {
    return {
      ...state,
      loading: true,
      isResetEmailProgress: true,
    };
  }),
  on(UserActions.userUpdateProfileRequest, state => {
    return {
      ...state,
      loading: true,
      isUpdateProfileProgress: true,
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
  on(UserActions.userChangeEmailError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isChangeEmailProgress: false,
    };
  }),
  on(UserActions.userResetEmailError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isResetEmailProgress: false,
    };
  }),
  on(UserActions.userUpdateProfileError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false,
      isUpdateProfileProgress: false,
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
  on(UserActions.userChangeEmailSuccess, (state) => {
    return {
      ...state,
      error: undefined,
      loading: false,
      isChangeEmailProgress: false,
    };
  }),
  on(UserActions.userResetEmailSuccess, (state) => {
    return {
      ...state,
      error: undefined,
      loading: false,
      isResetEmailProgress: false,
    };
  }),
  on(UserActions.userUpdateProfileSuccess, (state, { account }) => {
    return {
      ...state,
      profile: {
        ...state.profile,
        account,
      },
      error: undefined,
      loading: false,
      isUpdateProfileProgress: false,
    };
  }),
);

export default userReducer;
