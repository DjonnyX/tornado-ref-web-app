import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace SelectorSelectors {
  export const sselectSelector = (state: IAppState) => state.taSelector;

  export const selectEntity = createSelector(
    sselectSelector,
    state => state.selector,
  );

  export const selectMainImage = createSelector(
    sselectSelector,
    state => !!state.selector ? state.selector.images.main : undefined,
  );

  export const selectThumbnailImage = createSelector(
    sselectSelector,
    state => !!state.selector ? state.selector.images.thumbnail : undefined,
  );

  export const selectIconImage = createSelector(
    sselectSelector,
    state => !!state.selector ? state.selector.images.icon : undefined,
  );

  export const selectLoading = createSelector(
    sselectSelector,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    sselectSelector,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    sselectSelector,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    sselectSelector,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    sselectSelector,
    state => state.isDeleteProcess,
  );
}
