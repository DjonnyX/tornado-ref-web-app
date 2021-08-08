import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace SettingsSelectors {
    export const selectSettings = (state: IAppState) => state.taSettings;

    export const selectTheme = createSelector(
        selectSettings,
        state => state.theme,
    );
    export const selectProductsLayout = createSelector(
        selectSettings,
        state => state.productsLayout,
    );
    export const selectProductsInactiveVisibility = createSelector(
        selectSettings,
        state => state.productsInactiveVisibility,
    );
    export const selectSelectorsLayout = createSelector(
        selectSettings,
        state => state.selectorsLayout,
    );
    export const selectSelectorsInactiveVisibility = createSelector(
        selectSettings,
        state => state.selectorsInactiveVisibility,
    );
    export const selectTagsLayout = createSelector(
        selectSettings,
        state => state.tagsLayout,
    );
    export const selectTagsInactiveVisibility = createSelector(
        selectSettings,
        state => state.tagsInactiveVisibility,
    );
}
