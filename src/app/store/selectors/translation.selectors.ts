import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace TranslationSelectors {
  export const selectTranslation = (state: IAppState) => state.taTranslation;

  export const selectEntity = createSelector(
    selectTranslation,
    state => state.translation,
  );

  export const selectLoading = createSelector(
    selectTranslation,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTranslation,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectTranslation,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTranslation,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectTranslation,
    state => state.isDeleteProcess,
  );
}
