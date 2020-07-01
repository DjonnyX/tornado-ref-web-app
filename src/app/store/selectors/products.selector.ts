import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace ProductsSelectors {
  export const selectProducts = (state: IAppState) => state.taProducts;

  export const selectCollection = createSelector(
    selectProducts,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectProducts,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectNew = createSelector(
    selectProducts,
    state => state.new,
  );

  export const selectLoading = createSelector(
    selectProducts,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectProducts,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectProducts,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectProducts,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectProducts,
    state => state.isDeleteProcess,
  );
}
