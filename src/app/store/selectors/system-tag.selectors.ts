import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace SystemTagSelectors {
  export const selectSystemTag = (state: IAppState) => state.taSystemTag;

  export const selectEntity = createSelector(
    selectSystemTag,
    state => state.systemTag,
  );

  export const selectLoading = createSelector(
    selectSystemTag,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectSystemTag,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectSystemTag,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectSystemTag,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectSystemTag,
    state => state.isDeleteProcess,
  );
}
