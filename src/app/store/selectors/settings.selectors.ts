import { IAppState } from "../state";
import { createSelector } from "@ngrx/store";

export namespace SettingsSelectors {
    export const selectSettings = (state: IAppState) => state.taSettings;

    export const selectTheme = createSelector(
        selectSettings,
        state => state.theme,
    );
    export const selectLanguage = createSelector(
        selectSettings,
        state => state.language,
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
    export const selectAdsLayout = createSelector(
        selectSettings,
        state => state.adsLayout,
    );
    export const selectAdsInactiveVisibility = createSelector(
        selectSettings,
        state => state.adsInactiveVisibility,
    );
    export const selectAppThemesLayout = createSelector(
        selectSettings,
        state => state.appThemesLayout,
    );
    export const selectAppThemesInactiveVisibility = createSelector(
        selectSettings,
        state => state.appThemesInactiveVisibility,
    );
    export const selectNodesTreeNodesInactiveVisibility = createSelector(
        selectSettings,
        state => state.nodeTreeInactiveVisibility,
    );
    export const selectWeightUnitsLayout = createSelector(
        selectSettings,
        state => state.weightUnitsLayout,
    );
    export const selectWeightUnitsInactiveVisibility = createSelector(
        selectSettings,
        state => state.weightUnitsInactiveVisibility,
    );
}
