import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace CurrencySelectors {
  export const selectTag = (state: IAppState) => state.taCurrency;

  export const selectEntity = createSelector(
    selectTag,
    state => state.currency,
  );

  export const selectLoading = createSelector(
    selectTag,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTag,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectTag,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTag,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectTag,
    state => state.isDeleteProcess,
  );
}
