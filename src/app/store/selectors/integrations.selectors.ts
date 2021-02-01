import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace IntegrationsSelectors {
  export const selectIntegrations = (state: IAppState) => state.taIntegrations;

  export const selectCollection = createSelector(
    selectIntegrations,
    state => state.collection,
  );

  export const selectRefInfo = createSelector(
    selectIntegrations,
    state => !!state.meta ? state.meta.ref : undefined,
  );

  export const selectLoading = createSelector(
    selectIntegrations,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectIntegrations,
    state => state.isGetProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectIntegrations,
    state => state.isUpdateProcess,
  );
}
