import { createAction, props } from "@ngrx/store";
import { LayoutTypes } from "@components/state-panel/state-panel.component";

export enum SettingsActionTypes {
    CHANGE_THEME = "TORNADO/settings/change-theme",
    TOGGLE_THEME = "TORNADO/settings/toggle-theme",
    CHANGE_PRODUCTS_LAYOUT = "TORNADO/setting/change-products-layout",
    CHANGE_PRODUCTS_VISIBILITY = "TORNADO/setting/change-products-visibility",
    CHANGE_SELECTORS_LAYOUT = "TORNADO/setting/change-selectors-layout",
    CHANGE_SELECTORS_VISIBILITY = "TORNADO/setting/change-selectors-visibility",
    CHANGE_TAGS_LAYOUT = "TORNADO/setting/change-tags-layout",
    CHANGE_TAGS_VISIBILITY = "TORNADO/setting/change-tags-visibility",
}

export namespace SettingsActions {
    export const changeTheme = createAction(
        SettingsActionTypes.CHANGE_THEME,
        props<{ theme: string }>(),
    );
    export const toggleTheme = createAction(
        SettingsActionTypes.TOGGLE_THEME,
    );
    export const changeProductsLayout = createAction(
        SettingsActionTypes.CHANGE_PRODUCTS_LAYOUT,
        props<{ layout: LayoutTypes }>(),
    );
    export const changeProductsVisibility = createAction(
        SettingsActionTypes.CHANGE_PRODUCTS_VISIBILITY,
        props<{ showInactive: boolean }>(),
    );
    export const changeSelectorsLayout = createAction(
        SettingsActionTypes.CHANGE_SELECTORS_LAYOUT,
        props<{ layout: LayoutTypes }>(),
    );
    export const changeSelectorsVisibility = createAction(
        SettingsActionTypes.CHANGE_SELECTORS_VISIBILITY,
        props<{ showInactive: boolean }>(),
    );
    export const changeTagsLayout = createAction(
        SettingsActionTypes.CHANGE_TAGS_LAYOUT,
        props<{ layout: LayoutTypes }>(),
    );
    export const changeTagsVisibility = createAction(
        SettingsActionTypes.CHANGE_TAGS_VISIBILITY,
        props<{ showInactive: boolean }>(),
    );
}
