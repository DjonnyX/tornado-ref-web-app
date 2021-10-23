import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace RefServerInfoSelectors {
  export const selectServerInfo = (state: IAppState) => state.taRefServerInfo;

  export const selectEntity = createSelector(
    selectServerInfo,
    state => state.info,
  );

  export const selectLoading = createSelector(
    selectServerInfo,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectServerInfo,
    state => state.isGetProcess,
  );
}
