import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace ApplicationsSelectors {
  export const selectApplications = (state: IAppState) => state.taApplications;

  export const selectCollection = createSelector(
    selectApplications,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectApplications,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectApplications,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectApplications,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectApplications,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectApplications,
    state => state.isDeleteProcess,
  );
}
