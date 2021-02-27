import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace CheckueSelectors {
  export const selectCheckue = (state: IAppState) => state.taCheckue;

  export const selectEntity = createSelector(
    selectCheckue,
    state => state.checkue,
  );

  export const selectLoading = createSelector(
    selectCheckue,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectCheckue,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectCheckue,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectCheckue,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectCheckue,
    state => state.isDeleteProcess,
  );
}
