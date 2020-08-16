import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace TranslationsSelectors {
  export const selectTranslations = (state: IAppState) => state.taTranslations;

  export const selectCollection = createSelector(
    selectTranslations,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectTranslations,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectTranslations,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTranslations,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTranslations,
    state => state.isUpdateProcess,
  );
}
