import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace CurrenciesSelectors {
  export const selectSelectors = (state: IAppState) => state.taCurrencies;

  export const selectCollection = createSelector(
    selectSelectors,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectSelectors,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectSelectors,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectSelectors,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectSelectors,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectSelectors,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectSelectors,
    state => state.isDeleteProcess,
  );
}
