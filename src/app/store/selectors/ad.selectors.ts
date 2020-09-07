import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace AdSelectors {
  export const selectAd = (state: IAppState) => state.taAd;

  export const selectEntity = createSelector(
    selectAd,
    state => state.ad,
  );

  export const selectLoading = createSelector(
    selectAd,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectAd,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectAd,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectAd,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectAd,
    state => state.isDeleteProcess,
  );
}
