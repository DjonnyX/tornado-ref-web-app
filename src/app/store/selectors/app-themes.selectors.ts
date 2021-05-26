import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace AppThemesSelectors {
  export const selectAppThemes = (state: IAppState) => state.taThemes;

  export const selectCollection = createSelector(
    selectAppThemes,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectAppThemes,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectAppThemes,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectAppThemes,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectAppThemes,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectAppThemes,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectAppThemes,
    state => state.isDeleteProcess,
  );
}
