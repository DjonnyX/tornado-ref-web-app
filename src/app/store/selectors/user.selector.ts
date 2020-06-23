import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace UserSelectors {
  export const selectUser = (state: IAppState) => state.user;

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
