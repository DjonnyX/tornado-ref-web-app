import { LayoutTypes } from "@components/state-panel/state-panel.component";

export interface ISettingsState {
    theme: string;
    language: string;
    productsLayout: LayoutTypes;
    productsInactiveVisibility: boolean;
    selectorsLayout: LayoutTypes;
    selectorsInactiveVisibility: boolean;
    tagsLayout: LayoutTypes;
    tagsInactiveVisibility: boolean;
    adsLayout: LayoutTypes;
    adsInactiveVisibility: boolean;
    appThemesLayout: LayoutTypes;
    appThemesInactiveVisibility: boolean;
    nodeTreeInactiveVisibility: boolean;
    weightUnitsLayout: LayoutTypes;
    weightUnitsInactiveVisibility: boolean;
}