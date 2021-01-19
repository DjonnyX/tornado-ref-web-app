import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LicenseSelectors {
  export const selectLicense = (state: IAppState) => state.taLicense;

  export const selectEntity = createSelector(
    selectLicense,
    state => state.license,
  );

  export const selectLoading = createSelector(
    selectLicense,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectLicense,
    state => state.isGetProcess,
  );

  /*export const selectIsCreateProcess = createSelector(
    selectLicense,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectLicense,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectLicense,
    state => state.isDeleteProcess,
  );*/
}
