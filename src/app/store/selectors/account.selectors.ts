import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace AccountSelectors {
  export const selectAccount = (state: IAppState) => state.taAccount;

  export const selectEntity = createSelector(
    selectAccount,
    state => state.account,
  );

  export const selectLoading = createSelector(
    selectAccount,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectAccount,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectAccount,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectAccount,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectAccount,
    state => state.isDeleteProcess,
  );
}
