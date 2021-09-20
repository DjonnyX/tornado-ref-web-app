import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace RoleSelectors {
  export const selectRole = (state: IAppState) => state.taRole;

  export const selectEntity = createSelector(
    selectRole,
    state => state.role,
  );

  export const selectLoading = createSelector(
    selectRole,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectRole,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectRole,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectRole,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectRole,
    state => state.isDeleteProcess,
  );
}
