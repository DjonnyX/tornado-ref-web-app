import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace AdminSelectors {
  export const selectAdmin = (state: IAppState) => state.taAdmin;

  export const selectCurrentRouteIndex = createSelector(
    selectAdmin,
    state => state.currentRouteIndex
  );

  export const selectSidenavIsOpen = createSelector(
    selectAdmin,
    state => state.sidenavIsOpen
  );
}
