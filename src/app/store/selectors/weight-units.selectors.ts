import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace WeightUnitsSelectors {
  export const selectWeightUnits = (state: IAppState) => state.taWeightUnits;

  export const selectCollection = createSelector(
    selectWeightUnits,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectWeightUnits,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectWeightUnits,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectWeightUnits,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectWeightUnits,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectWeightUnits,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectWeightUnits,
    state => state.isDeleteProcess,
  );
}
