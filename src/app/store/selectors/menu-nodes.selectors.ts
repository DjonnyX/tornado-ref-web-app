import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace MenuNodesSelectors {
  export const selectMenuNodes = (state: IAppState) => state.taMenuNodes;

  export const selectCollection = createSelector(
    selectMenuNodes,
    state => state.collection,
  );

  export const selectRootNodeId = createSelector(
    selectMenuNodes,
    state => state.rootNodeId,
  );

  export const selectRefInfo = createSelector(
    selectMenuNodes,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectMenuNodes,
    state => state.isCreateProcess || state.isDeleteProcess || state.isGetProcess || state.isUpdateProcess || state.isGetRootNodeProcess,
  );

  export const selectIsGetProcess = createSelector(
    selectMenuNodes,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectMenuNodes,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectMenuNodes,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectMenuNodes,
    state => state.isDeleteProcess,
  );
}
