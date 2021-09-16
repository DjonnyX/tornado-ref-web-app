import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace IntegrationServerInfoSelectors {
  export const selectIntegration = (state: IAppState) => state.taIntegrationServerInfo;

  export const selectEntity = createSelector(
    selectIntegration,
    state => state.info,
  );

  export const selectLoading = createSelector(
    selectIntegration,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectIntegration,
    state => state.isGetProcess,
  );
}
