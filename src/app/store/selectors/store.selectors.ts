import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace StoreSelectors {
  export const selectStore = (state: IAppState) => state.taStore;

  export const selectEntity = createSelector(
    selectStore,
    state => state.store,
  );

  export const selectLoading = createSelector(
    selectStore,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectStore,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectStore,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectStore,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectStore,
    state => state.isDeleteProcess,
  );
}
