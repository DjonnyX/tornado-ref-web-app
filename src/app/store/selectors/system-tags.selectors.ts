import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace SystemTagsSelectors {
  export const selectSystemTags = (state: IAppState) => state.taSystemTags;

  export const selectCollection = createSelector(
    selectSystemTags,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectSystemTags,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectSystemTags,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectSystemTags,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectSystemTags,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectSystemTags,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectSystemTags,
    state => state.isDeleteProcess,
  );
}
