import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace TerminalsSelectors {
  export const selectTerminals = (state: IAppState) => state.taTerminals;

  export const selectCollection = createSelector(
    selectTerminals,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectTerminals,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectTerminals,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTerminals,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTerminals,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectTerminals,
    state => state.isDeleteProcess,
  );
}
