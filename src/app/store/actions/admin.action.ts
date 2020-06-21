import { createAction, props } from "@ngrx/store";

export enum AdminActionTypes {
    SIDENAV_HAS_BACKDROP = "TORNADO/admin/sidenav-has-backdrop",
    SIDENAV_OPEN = "TORNADO/admin/sidenav-open",
    SIDENAV_TOGGLE = "TORNADO/admin/sidenav-toggle",
    CURRENT_ROUTE = "TORNADO/admin/current-route",
}

export namespace AdminActions {
    export const setSidenavHasBackdrop = createAction(
        AdminActionTypes.SIDENAV_HAS_BACKDROP,
        props<{ sidenavHasBackdrop: boolean }>()
    );
    export const setSidenavIsOpen = createAction(
        AdminActionTypes.SIDENAV_OPEN,
        props<{ sidenavIsOpen: boolean }>()
    );
    export const toggleSideNav = createAction(
        AdminActionTypes.SIDENAV_TOGGLE
    );
    export const setCurrentRouteIndex = createAction(
        AdminActionTypes.CURRENT_ROUTE,
        props<{ currentRouteIndex: number }>()
    );
}
