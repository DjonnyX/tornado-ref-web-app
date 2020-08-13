import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace LanguagesSelectors {
  export const selectLanguages = (state: IAppState) => state.taLanguages;

  export const selectCollection = createSelector(
    selectLanguages,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectLanguages,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectLanguages,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectLanguages,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectLanguages,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectLanguages,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectLanguages,
    state => state.isDeleteProcess,
  );
}
