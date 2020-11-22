import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LicenseTypesSelectors {
  export const selectLicenseTypes = (state: IAppState) => state.taLicenseTypes;

  export const selectCollection = createSelector(
    selectLicenseTypes,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectLicenseTypes,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectLicenseTypes,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectLicenseTypes,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectLicenseTypes,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectLicenseTypes,
    state => state.isDeleteProcess,
  );
}
