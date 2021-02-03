import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace IntegrationSelectors {
  export const selectIntegration = (state: IAppState) => state.taIntegration;

  export const selectEntity = createSelector(
    selectIntegration,
    state => state.integration,
  );

  export const selectLoading = createSelector(
    selectIntegration,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectIntegration,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectIntegration,
    state => state.isUpdateProcess,
  );
}
