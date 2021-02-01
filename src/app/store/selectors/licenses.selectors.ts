import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LicensesSelectors {
  export const selectLicenses = (state: IAppState) => state.taLicenses;

  export const selectCollection = createSelector(
    selectLicenses,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectLicenses,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectLicenses,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectLicenses,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectLicenses,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectLicenses,
    state => state.isDeleteProcess,
  );
}
