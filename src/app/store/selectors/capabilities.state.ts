import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace CapabilitiesSelectors {
  export const selectCapabilities = (state: IAppState) => state.taCapabilities;

  export const selectReturnUrl = createSelector(
    selectCapabilities,
    state => state.returnUrl
  );
}
