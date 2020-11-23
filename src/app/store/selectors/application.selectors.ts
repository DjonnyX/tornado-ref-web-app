import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace ApplicationSelectors {
  export const selectApplication = (state: IAppState) => state.taApplication;

  export const selectEntity = createSelector(
    selectApplication,
    state => state.application,
  );

  export const selectLoading = createSelector(
    selectApplication,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectApplication,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectApplication,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectApplication,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectApplication,
    state => state.isDeleteProcess,
  );
}
