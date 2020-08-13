import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace OrderTypeSelectors {
  export const selectOrderTypes = (state: IAppState) => state.taOrderType;

  export const selectEntity = createSelector(
    selectOrderTypes,
    state => state.orderType,
  );

  export const selectImages = createSelector(
    selectOrderTypes,
    state => !!state.orderType ? state.orderType.images : undefined,
  );

  export const selectLoading = createSelector(
    selectOrderTypes,
    state => state.loading,
  );

  export const selectIsGetProcess = createSelector(
    selectOrderTypes,
    state => state.isGetProcess,
  );

  export const selectIsCreateProcess = createSelector(
    selectOrderTypes,
    state => state.isCreateProcess,
  );

  export const selectIsUpdateProcess = createSelector(
    selectOrderTypes,
    state => state.isUpdateProcess,
  );

  export const selectIsDeleteProcess = createSelector(
    selectOrderTypes,
    state => state.isDeleteProcess,
  );
}
