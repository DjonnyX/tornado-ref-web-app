import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace DocumentationSelectors {
  export const selectDocumentation = (state: IAppState) => state.taDocumentation;

  export const selectCurrentRouteIndex = createSelector(
    selectDocumentation,
    state => state.currentRouteIndex
  );

  export const selectSidenavIsOpen = createSelector(
    selectDocumentation,
    state => state.sidenavIsOpen
  );
}
