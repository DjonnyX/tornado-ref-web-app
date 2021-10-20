import { createAction, props } from "@ngrx/store";

export enum DocumentationActionTypes {
    SIDENAV_OPEN = "TORNADO/documentation/sidenav-open",
    SIDENAV_TOGGLE = "TORNADO/documentation/sidenav-toggle",
    CURRENT_ROUTE = "TORNADO/documentation/current-route",
}

export namespace DocumentationActions {
    export const setSidenavOpen = createAction(
        DocumentationActionTypes.SIDENAV_OPEN,
        props<{ sidenavIsOpen: boolean }>()
    );
    export const toggleSideNav = createAction(
        DocumentationActionTypes.SIDENAV_TOGGLE
    );
    export const setCurrentRouteIndex = createAction(
        DocumentationActionTypes.CURRENT_ROUTE,
        props<{ currentRouteIndex: number }>()
    );
}
