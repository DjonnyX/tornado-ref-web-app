import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace TagSelectors {
  export const selectTag = (state: IAppState) => state.taTag;

  export const selectEntity = createSelector(
    selectTag,
    state => state.tag,
  );

  export const selectLoading = createSelector(
    selectTag,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTag,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectTag,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTag,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectTag,
    state => state.isDeleteProcess,
  );
}
