import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace TagsSelectors {
  export const selectTags = (state: IAppState) => state.taTags;

  export const selectCollection = createSelector(
    selectTags,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectTags,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectTags,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTags,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectTags,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTags,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectTags,
    state => state.isDeleteProcess,
  );
}
