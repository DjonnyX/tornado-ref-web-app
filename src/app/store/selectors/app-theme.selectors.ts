import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace AppThemeSelectors {
  export const selectAppTheme = (state: IAppState) => state.taTheme;

  export const selectEntity = createSelector(
    selectAppTheme,
    state => state.theme,
  );

  export const selectLoading = createSelector(
    selectAppTheme,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectAppTheme,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectAppTheme,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectAppTheme,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectAppTheme,
    state => state.isDeleteProcess,
  );
}
