import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace StoresSelectors {
  export const selectStores = (state: IAppState) => state.taStores;

  export const selectCollection = createSelector(
    selectStores,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectStores,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectStores,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectStores,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectStores,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectStores,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectStores,
    state => state.isDeleteProcess,
  );
}
