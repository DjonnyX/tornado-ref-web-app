import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace AccountsSelectors {
  export const selectAccounts = (state: IAppState) => state.taAccounts;

  export const selectCollection = createSelector(
    selectAccounts,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectAccounts,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectAccounts,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectAccounts,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectAccounts,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectAccounts,
    state => state.isDeleteProcess,
  );
}
