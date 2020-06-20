import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace UserSelectors {
  export const selectUser = (state: IAppState) => state.user;

  export const selectLogged = createSelector(
    selectUser,
    state => state.logged
  );

  export const selectLoaded = createSelector(
    selectUser,
    state => state.loading
  );
}
