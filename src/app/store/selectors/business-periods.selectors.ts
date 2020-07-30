import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace BusinessPeriodsSelectors {
  export const selectBusinessPeriods = (state: IAppState) => state.taBusinessPeriods;

  export const selectCollection = createSelector(
    selectBusinessPeriods,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectBusinessPeriods,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectBusinessPeriods,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectBusinessPeriods,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectBusinessPeriods,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectBusinessPeriods,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectBusinessPeriods,
    state => state.isDeleteProcess,
  );
}
