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
}
