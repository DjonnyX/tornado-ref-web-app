import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace SubscriptionSelectors {
  export const selectSubscription = (state: IAppState) => state.taSubscription;

  export const selectEntity = createSelector(
    selectSubscription,
    state => state.subscription,
  );

  export const selectLoading = createSelector(
    selectSubscription,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectSubscription,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectSubscription,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectSubscription,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectSubscription,
    state => state.isDeleteProcess,
  );
}
