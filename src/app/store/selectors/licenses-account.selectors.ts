import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LicensesAccountSelectors {
  export const selectLicenses = (state: IAppState) => state.taLicensesAccount;

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
}
