import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace ProductSelectors {
  export const selectProduct = (state: IAppState) => state.taProduct;

  export const selectEntity = createSelector(
    selectProduct,
    state => state.product,
  );

  export const selectMainImage = createSelector(
    selectProduct,
    state => !!state.product ? state.product.images.main : undefined,
  );

  export const selectThumbnailImage = createSelector(
    selectProduct,
    state => !!state.product ? state.product.images.thumbnail : undefined,
  );

  export const selectIconImage = createSelector(
    selectProduct,
    state => !!state.product ? state.product.images.icon : undefined,
  );

  export const selectLoading = createSelector(
    selectProduct,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectProduct,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectProduct,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectProduct,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectProduct,
    state => state.isDeleteProcess,
  );
}
