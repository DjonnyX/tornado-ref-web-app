import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LanguageAssetsSelectors {
  export const selectAssets = (state: IAppState) => state.taLanguageAssets;

  export const selectCollection = createSelector(
    selectAssets,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectAssets,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectAssets,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectAssets,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectAssets,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectAssets,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectAssets,
    state => state.isDeleteProcess,
  );
}
