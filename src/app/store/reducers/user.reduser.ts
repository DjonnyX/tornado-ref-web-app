import { createReducer, on } from '@ngrx/store';
import { IUserState } from '@store/state/user.state';
import { UserActions } from '@store/actions/user.action';

export const initialState: IUserState = {
  loading: false,
  error: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  logged: false,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.userAuthRequest, UserActions.userRegistrationRequest, state => {
    return {
      ...state,
      loading: true
    };
  }),
  on(UserActions.userAuthError, (state, { error }) => {
    return {
      ...state,
      error,
      loading: false
    };
  }),
  on(UserActions.userRegistrationError, (state, { error }) => {
    return {
      ...state,
      error,
      logged: false,
      loading: false
    };
  }),
  on(UserActions.userAuthSuccess, (state, { user }) => {
    return {
      ...state,
      ...user,
      logged: true,
      error: undefined,
      loading: false
    };
  }),
  on(UserActions.userRegistrationSuccess, (state, { user }) => {
    return {
      ...state,
      ...user,
      error: undefined,
      loading: false
    };
  }),
);

export default userReducer;
