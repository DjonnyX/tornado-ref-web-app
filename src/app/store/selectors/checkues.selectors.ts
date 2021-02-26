import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace CheckuesSelectors {
  export const selectCheckues = (state: IAppState) => state.taCheckues;

  export const selectCollection = createSelector(
    selectCheckues,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectCheckues,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectCheckues,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectCheckues,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectCheckues,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectCheckues,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectCheckues,
    state => state.isDeleteProcess,
  );
}
