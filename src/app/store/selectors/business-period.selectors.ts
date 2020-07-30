import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace BusinessPeriodSelectors {
  export const selectBusinessPeriod = (state: IAppState) => state.taBusinessPeriod;

  export const selectEntity = createSelector(
    selectBusinessPeriod,
    state => state.businessPeriod,
  );

  export const selectLoading = createSelector(
    selectBusinessPeriod,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectBusinessPeriod,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectBusinessPeriod,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectBusinessPeriod,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectBusinessPeriod,
    state => state.isDeleteProcess,
  );
}
