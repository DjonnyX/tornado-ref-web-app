import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LicenseAccountSelectors {
  export const selectLicense = (state: IAppState) => state.taLicenseAccount;

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
}
