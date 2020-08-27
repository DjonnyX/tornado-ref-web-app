import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LanguageSelectors {
  export const selectLanguage = (state: IAppState) => state.taLanguage;

  export const selectEntity = createSelector(
    selectLanguage,
    state => state.language,
  );

  export const selectLoading = createSelector(
    selectLanguage,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectLanguage,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectLanguage,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectLanguage,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectLanguage,
    state => state.isDeleteProcess,
  );
}
