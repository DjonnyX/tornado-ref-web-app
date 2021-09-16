import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace UserSelectors {
  export const selectUser = (state: IAppState) => state.taUser;

  export const selectUserProfile = createSelector(
    selectUser,
    state => state.profile
  );

  export const selectToken = createSelector(
    selectUser,
    state => !!state.profile ? state.profile.token : undefined,
  );

  export const selectIsSigninProcess = createSelector(
    selectUser,
    state => state.isSigninProgress
  );

  export const selectIsSignupParamsProcess = createSelector(
    selectUser,
    state => state.isSignupParamsProgress
  );

  export const selectIsSignupProcess = createSelector(
    selectUser,
    state => state.isSignupProgress
  );

  export const selectIsForgotPasswordProcess = createSelector(
    selectUser,
    state => state.isForgotPasswordProgress
  );

  export const selectIsResetPasswordProcess = createSelector(
    selectUser,
    state => state.isResetPasswordProgress
  );

  export const selectIsChangeEmailProcess = createSelector(
    selectUser,
    state => state.isChangeEmailProgress
  );

  export const selectIsResetEmailProcess = createSelector(
    selectUser,
    state => state.isResetEmailProgress
  );

  export const selectIsUpdateUserProfileProcess = createSelector(
    selectUser,
    state => state.isUpdateProfileProgress
  );

  export const selectLoaded = createSelector(
    selectUser,
    state => state.loading
  );

  export const selectCaptcha = createSelector(
    selectUser,
    state => state.captcha
  );
}
