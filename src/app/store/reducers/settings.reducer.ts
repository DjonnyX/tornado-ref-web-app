import { createReducer, on } from '@ngrx/store';
import { ISettingsState } from '@store/state/settings.state';
import { LayoutTypes } from '@components/state-panel/state-panel.component';
import { SettingsActions } from '@store/actions/settings.action';

export const initialState: ISettingsState = {
    theme: 'light',
    productsLayout: LayoutTypes.CARD,
    productsInactiveVisibility: true,
    selectorsLayout: LayoutTypes.CARD,
    selectorsInactiveVisibility: true,
    tagsLayout: LayoutTypes.CARD,
    tagsInactiveVisibility: true,
};

const settingsReducer = createReducer(
    initialState,
    on(SettingsActions.changeTheme, (state, { theme }) => {
        return {
            ...state,
            theme,
        };
    }),
    on(SettingsActions.toggleTheme, (state) => {
        return {
            ...state,
            theme: state.theme === 'light' ? 'dark' : 'light',
        };
    }),
    on(SettingsActions.changeProductsLayout, (state, { layout }) => {
        return {
            ...state,
            productsLayout: layout,
        };
    }),
    on(SettingsActions.changeProductsVisibility, (state, { showInactive }) => {
        return {
            ...state,
            productsInactiveVisibility: showInactive,
        };
    }),
    on(SettingsActions.changeSelectorsLayout, (state, { layout }) => {
        return {
            ...state,
            selectorsLayout: layout,
        };
    }),
    on(SettingsActions.changeSelectorsVisibility, (state, { showInactive }) => {
        return {
            ...state,
            selectorsInactiveVisibility: showInactive,
        };
    }),
    on(SettingsActions.changeTagsLayout, (state, { layout }) => {
        return {
            ...state,
            tagsLayout: layout,
        };
    }),
    on(SettingsActions.changeTagsVisibility, (state, { showInactive }) => {
        return {
            ...state,
            tagsInactiveVisibility: showInactive,
        };
    }),
);

export default settingsReducer;
