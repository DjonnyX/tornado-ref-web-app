import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace WeightUnitSelectors {
  export const selectWeightUnit = (state: IAppState) => state.taWeightUnit;

  export const selectEntity = createSelector(
    selectWeightUnit,
    state => state.weightUnit,
  );

  export const selectLoading = createSelector(
    selectWeightUnit,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectWeightUnit,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectWeightUnit,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectWeightUnit,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectWeightUnit,
    state => state.isDeleteProcess,
  );
}
