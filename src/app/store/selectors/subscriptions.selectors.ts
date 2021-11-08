import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace SubscriptionsSelectors {
  export const selectSubscriptions = (state: IAppState) => state.taSubscriptions;

  export const selectCollection = createSelector(
    selectSubscriptions,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectSubscriptions,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectSubscriptions,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectSubscriptions,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectSubscriptions,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectSubscriptions,
    state => state.isDeleteProcess,
  );
}
