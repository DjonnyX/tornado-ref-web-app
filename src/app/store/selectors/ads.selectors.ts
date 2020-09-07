import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace AdsSelectors {
  export const selectAds = (state: IAppState) => state.taAds;

  export const selectCollection = createSelector(
    selectAds,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectAds,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectAds,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectAds,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectAds,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectAds,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectAds,
    state => state.isDeleteProcess,
  );
}
