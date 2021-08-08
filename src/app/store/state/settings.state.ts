import { LayoutTypes } from "@components/state-panel/state-panel.component";

export interface ISettingsState {
    theme: string;
    productsLayout: LayoutTypes;
    productsInactiveVisibility: boolean;
    selectorsLayout: LayoutTypes;
    selectorsInactiveVisibility: boolean;
    tagsLayout: LayoutTypes;
    tagsInactiveVisibility: boolean;
}