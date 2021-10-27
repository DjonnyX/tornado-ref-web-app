import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace TarifSelectors {
  export const selectTarif = (state: IAppState) => state.taTarif;

  export const selectEntity = createSelector(
    selectTarif,
    state => state.tarif,
  );

  export const selectLoading = createSelector(
    selectTarif,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectTarif,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectTarif,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectTarif,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectTarif,
    state => state.isDeleteProcess,
  );
}
