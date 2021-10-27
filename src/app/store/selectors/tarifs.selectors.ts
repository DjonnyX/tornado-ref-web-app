import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace TarifsSelectors {
  export const selectTarifs = (state: IAppState) => state.taTarifs;

  export const selectCollection = createSelector(
    selectTarifs,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectTarifs,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectTarifs,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTarifs,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTarifs,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectTarifs,
    state => state.isDeleteProcess,
  );
}
