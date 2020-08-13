import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace CurrenciesSelectors {
  export const selectCurrencies = (state: IAppState) => state.taCurrencies;

  export const selectCollection = createSelector(
    selectCurrencies,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectCurrencies,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectCurrencies,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectCurrencies,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectCurrencies,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectCurrencies,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectCurrencies,
    state => state.isDeleteProcess,
  );
}
