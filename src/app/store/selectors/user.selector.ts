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

  export const selectLoaded = createSelector(
    selectUser,
    state => state.loading
  );
}
