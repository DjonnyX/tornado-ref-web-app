import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LicenseTypeSelectors {
  export const selectLicenseType = (state: IAppState) => state.taLicenseType;

  export const selectEntity = createSelector(
    selectLicenseType,
    state => state.licenseType,
  );

  export const selectLoading = createSelector(
    selectLicenseType,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectLicenseType,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectLicenseType,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectLicenseType,
    state => state.isDeleteProcess,
  );
}
