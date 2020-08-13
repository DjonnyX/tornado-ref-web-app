import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace OrderTypesSelectors {
  export const selectOrderTypes = (state: IAppState) => state.taOrderTypes;

  export const selectCollection = createSelector(
    selectOrderTypes,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectOrderTypes,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectOrderTypes,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectOrderTypes,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectOrderTypes,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectOrderTypes,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectOrderTypes,
    state => state.isDeleteProcess,
  );
}
