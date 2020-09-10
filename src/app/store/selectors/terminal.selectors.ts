import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace TerminalSelectors {
  export const selectTerminal = (state: IAppState) => state.taTerminal;

  export const selectEntity = createSelector(
    selectTerminal,
    state => state.terminal,
  );

  export const selectLoading = createSelector(
    selectTerminal,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTerminal,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTerminal,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectTerminal,
    state => state.isDeleteProcess,
  );
}
