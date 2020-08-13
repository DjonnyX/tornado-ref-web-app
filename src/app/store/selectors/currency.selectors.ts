import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace CurrencySelectors {
  export const selectCurrency = (state: IAppState) => state.taCurrency;

  export const selectEntity = createSelector(
    selectCurrency,
    state => state.currency,
  );

  export const selectLoading = createSelector(
    selectCurrency,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectCurrency,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectCurrency,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectCurrency,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectCurrency,
    state => state.isDeleteProcess,
  );
}
