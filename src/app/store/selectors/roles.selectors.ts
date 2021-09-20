import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace RolesSelectors {
  export const selectRoles = (state: IAppState) => state.taRoles;

  export const selectCollection = createSelector(
    selectRoles,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectRoles,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectRoles,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectRoles,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectRoles,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectRoles,
    state => state.isDeleteProcess,
  );
}
